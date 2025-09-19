import Sale from "../models/pay.model.js";

class SalesRepository {
  async create(data) {
    return await Sale.create(data);
  }

  async getSales() {
    return await Sale.find();
  }

  async getByPreferenceId(preferenceId) {
    return await Sale.findById(preferenceId);
  }

  async updateStatus(preferenceId, updateData) {
    return await Sale.findOneAndUpdate(preferenceId, updateData, { new: true });
  }
}

export default new SalesRepository();
