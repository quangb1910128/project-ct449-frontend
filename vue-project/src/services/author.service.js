import createApiClient from "./api.service";
class AuthorService {
    constructor(baseUrl = "/v1/author") {
        this.api = createApiClient(baseUrl);
    }
    async getAllAuthor() {
        return (await this.api.get("/")).data;
    }
    async addAuthor(data) {
        return (await this.api.post("/", data)).data;
    }
    async getAnAuthor(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async updateAuthor(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async deleteAuthor(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new AuthorService();