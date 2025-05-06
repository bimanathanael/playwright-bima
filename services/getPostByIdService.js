class GetPostByIdService {
    constructor(request) {
        this.request = request;
        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }
  
    async getPostById(id) {
        return this.request.get(`${this.baseURL}/posts/${id}`);
    }
  }
  module.exports = { GetPostByIdService };