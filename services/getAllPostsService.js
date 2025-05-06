class GetAllPostsService {
    constructor(request) {
        this.request = request;
        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }
  
    async getAllPosts() {
        return this.request.get(`${this.baseURL}/posts`);
    }
  }
  module.exports = { GetAllPostsService };