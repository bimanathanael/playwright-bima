class CreatePostService {
    constructor(request) {
        this.request = request;
        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }
  
    async createPost(data) {
        return this.request.post(`${this.baseURL}/posts`, { data });
    }
  }
  module.exports = { CreatePostService };