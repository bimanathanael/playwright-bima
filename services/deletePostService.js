class DeletePostService {
    constructor(request) {
        this.request = request;
        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }
  
    async deletePost(id) {
        return this.request.delete(`${this.baseURL}/posts/${id}`);
    }
  }
  module.exports = { DeletePostService };