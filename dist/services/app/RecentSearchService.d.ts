import { RecentSearchInterface } from "../../interfaces/RecentSearchInterface";
declare class RecentSearchService {
    /**
 
    * @param userId
    * @param searchText
    * @returns new added recentsearch
    */
    add(userId: any, searchText: string): Promise<RecentSearchInterface>;
    /**
         *
         * @param id {String} recentsearch id for deleting recentsearch
         * @returns {Promise<RecentSearchInterface>} deleted recentsearch
         */
    delete(id: string): Promise<RecentSearchInterface>;
}
declare const _default: RecentSearchService;
export default _default;
