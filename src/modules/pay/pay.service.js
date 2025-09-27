import SalesRepository from "./repositories/pay.repository.js";

class SalesService {
  async createSale(data) {
    return await SalesRepository.create(data);
  }

  async getTicketById(id){
    return await SalesRepository.getByPreferenceId(id)
  }

  async getTickets(){
    return await SalesRepository.getSales()
  }

  async updateSaleStatus(preferenceId, status) {
    return await SalesRepository.updateStatus(preferenceId, status)
  }
}

export default new SalesService();
