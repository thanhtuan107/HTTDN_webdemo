class WineApi {
  baseUrl = "https://6752d35af3754fcea7b9be1e.mockapi.io/api/Products";

  fetchWines() {
    return axios({
      url: this.baseUrl,
      method: "GET",
    });
  }

  deleteWineById(id) {
    return axios({
      url: `${this.baseUrl}/${id}`,
      method: "DELETE",
    });
  }

  addWine(wine) {
    return axios({
      url: this.baseUrl,
      method: "POST",
      data: wine,
    });
  }

  getWineById(id) {
    return axios({
      url: `${this.baseUrl}/${id}`,
      method: "GET",
    });
  }

  updateWine(wine) {
    return axios({
      url: `${this.baseUrl}/${wine.id}`,
      method: "PUT",
      data: wine,
    });
  }
}

export default new WineApi();
