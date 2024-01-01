"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GroupModel_1 = require("../../models/GroupModel");
const UserModel_1 = require("../../models/UserModel");
const GroupRequestService_1 = require("./GroupRequestService");
const axios_1 = require("axios");
const Env_1 = require("../../environments/Env");
const Email_1 = require("../../utils/Email");
const GroupInviteModel_1 = require("../../models/GroupInviteModel");
class GroupInviteService {
    inviteMember(sender, groupId, emails, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const inviteEmails = [];
            const group = yield GroupModel_1.default.findById(groupId);
            if (!group)
                return { groupNotExists: true };
            if (JSON.stringify(group.createdBy) !== JSON.stringify(sender._id))
                return { notAdmin: true };
            for (const email of emails) {
                const userExists = yield UserModel_1.default.findOne({ email, isDeleted: false });
                if (userExists) {
                    yield GroupRequestService_1.default.createRequest(userExists._id, groupId, group.groupCode, sender._id);
                }
                else {
                    inviteEmails.push(email);
                }
            }
            this.sendInvitationEmails(group, sender, inviteEmails, content);
            return {
                isInvited: true
            };
        });
    }
    /**
     *
     * @param groupId
     * @param emails
     * @param content
     */
    sendInvitationEmails(group, sender, emails, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupId = group._id;
            const invitationLink = yield this.getDeepLink('/root/signup?groupId=', groupId);
            for (const email of emails) {
                if (!(yield GroupInviteModel_1.default.exists({ email, invitedBy: sender._id, groupId: group._id })))
                    yield GroupInviteModel_1.default.create({
                        email,
                        groupCode: group.groupCode,
                        groupId: group._id,
                        invitedBy: sender._id
                    });
                yield new Email_1.Email(email).sendInvitationEmail(invitationLink, content);
            }
        });
    }
    /**
     *
     * @param endPoint
     * @param token
     * @returns
     */
    getDeepLink(endPoint, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // return id;
            const link = yield (0, axios_1.default)({
                method: 'post',
                url: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDHEggHNDGlr_u3oT5wNMPzivVXESAIwE4',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    dynamicLinkInfo: {
                        domainUriPrefix: 'https://wefundus.page.link',
                        link: `${(0, Env_1.env)().webUrl}${endPoint}${token}`,
                        iosInfo: {
                            iosBundleId: 'com.wefundus.mobilecoderz',
                            iosFallbackLink: 'https://staging.wefundus.com'
                        },
                        androidInfo: {
                            androidPackageName: 'com.wefundus.mobilecoderz',
                            androidFallbackLink: 'https://staging.wefundus.com'
                        },
                    },
                    suffix: {
                        option: 'SHORT',
                    },
                }
            });
            return link.data.shortLink;
        });
    }
}
exports.default = new GroupInviteService();
