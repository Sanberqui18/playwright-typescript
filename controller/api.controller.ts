import { APIRequestContext, APIResponse, request } from "@playwright/test";

class APIController {
  private fakerApi: APIRequestContext;

  async init() {
    this.fakerApi = await request.newContext({
      baseURL: "https://jsonplaceholder.typicode.com/"
    });
  }

  async getUsers(): Promise<APIResponse> {
    const response = await this.fakerApi.get("users");
    const responseBody = await response.json();
    return responseBody[0];
  }

  async createUserToDo(): Promise<APIResponse> {
    const postResponse = await this.fakerApi.post("users/1/todos", {
      data: {
        title: "Learn Playwirght",
        completed: false
      }
    });
    return await postResponse.json();
  }
}

export default new APIController();
