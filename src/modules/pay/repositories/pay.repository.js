import Sale from "../models/pay.model.js";

class SalesRepository {
  async create(data) {
    return await Sale.create(data);
  }

  async getByPreferenceId(preferenceId) {
    return await Sale.findOne({ preferenceId });
  }

  async updateStatus(preferenceId, updateData) {
    return await Sale.findOneAndUpdate({ preferenceId }, { $set: updateData }, { new: true });
  }
}

export default new SalesRepository();
