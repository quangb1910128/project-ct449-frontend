import createApiClient from "./api.service";
class BookService {
    constructor(baseUrl = "/v1/book") {
        this.api = createApiClient(baseUrl);
    }
    async getAllBook() {
        return (await this.api.get("/")).data;
    }
    async addBook(data) {
        return (await this.api.post("/", data)).data;
    }
    async getABook(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async updateBook(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async deleteBook(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new BookService();