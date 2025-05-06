class UpdatePostService {
    constructor(request) {
        this.request = request;
        this.baseURL = 'https://jsonplaceholder.typicode.com';
    }
  
    async putPost(id, data) {
        return this.request.put(`${this.baseURL}/posts/${id}`, { data });
    }
  
    async patchPost(id, data) {
        return this.request.patch(`${this.baseURL}/posts/${id}`, { data });
    }
  }
  module.exports = { UpdatePostService };