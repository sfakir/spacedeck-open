'use strict';

const db = require('../models/db');
var config = require('config');
const createError = require('http-errors')

/**
 * Not sure for the case:
 *  - user has a role in the room
 *  and uses edithash...?
 * @param space
 * @param user
 * @param userEditHash
 * @returns {Promise<*>}
 */
async function authenticateSpace(space, user, userEditHash) {

    if (userEditHash && space.edit_hash && userEditHash === space.edit_hash) {
        // Todo I think i should the edit hash here?
        return { anonyoums: true, role: 'editor' };
    }

    // handle public spaces
    if (space.access_mode === "public") {
        if (space.password && !req.spacePassword) {
            throw new createError(403, "password missing");
        }
        if (space.password && space.password !== req.spacePassword) {
            // todo: password not hashed!
            throw new createError(403, "password wrong");
        }
        return { anonyoums: true, role: 'viewer' };
    }

    // handle user is registered (and has a role in space)
    if (user) {
        const roleInSpace = await db.getUserRoleInSpacePromise(space, req.user);
        if (roleInSpace !== "none") {
            // const chosenLevel = getHigherRole(roleInSpace, userRequestAuth);
            return { anonyoums: false, role: roleInSpace };
        }
    }

    throw new createError(401, "not authenticated");


}

/**
 * Known roles:
 *  admin;editor;viewer
 * @param roleA
 * @param roleB
 * @deprecated
 * @returns {*}
 */
function getHigherRole(roleA, roleB) {
    if (roleA === "admin" || roleB === 'admin') {
        return "admin";
    }
    if (roleA === "editor" || roleB === 'editor') {
        return "editor";
    }
    return roleA;
}

/**
 * Comment: this module should be completely rewritten;
 * it's really tough to follow the logic here.
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = async (req, res, next) => {
    let spaceId = req.params.id;
    const userRequestAuth = req.spaceAuth;
    console.log('userRequestAuth',req.spaceAuth, req.headers['x-spacedeck-space-auth'])

    const space = await db.Space.findOne({ where: { "_id": spaceId } })
    if (!space) {
        res.status(404).json({ "error": "space_not_found" });
        return;
    }

    // special permission for screenshot/pdf export from backend
    if (req.query['api_token'] && req.query['api_token'] == config.get('phantom_api_secret')) {
        finalizeReq(space, "viewer");
        return;
    }
    Promise.resolve()
        .then(() => authenticateSpace(space, req.user, userRequestAuth))
        .then(({ anonyoums, role }) => {
            if (role === "none") {
                throw new createError(403, "access denied");
            }
            req['space'] = space;
            req['spaceRole'] = role;
            console.log('setting role', role);
            res.header("x-spacedeck-space-role", req['spaceRole']);
            next();
        })
        .catch((error) => {
            res.send(error)
        })
    // });


}