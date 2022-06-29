import PointServices from "../services/pointServices.js";

class PointController {
  async createPointType(req, res) {
    try {
      const { serviceName, name } = req.body;
      console.log(serviceName, name);
      if (name) {
        const pointType = await PointServices.createPointType(
          serviceName,
          name
        );
        return res.status(200).json({
          message: "Тип точки добавлен",
        });
      }
      return res.status(400).json({
        message: "Поле name не заполненно",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }
  async findPointTypeById(req, res) {
    try {
      const { id } = req.query;
      if (id) {
        const pointType = await PointServices.findPointTypeById(id);
        return res.status(200).json({
          pointType,
        });
      }
      return res.status(400).json({
        message: "Поле id не заполненно",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }
  async findAllPointTypes(req, res) {
    try {
      const pointTypes = await PointServices.findAllPointTypes();
      return res.status(200).json({
        pointTypes,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }
  async createPoint(req, res) {
    try {
      const { coordinate, name, description, typeId } = req.body;
      if (typeId || coordinate.length != 2) {
        const point = await PointServices.createPoint(
          coordinate,
          name,
          description,
          typeId
        );
        return res.status(200).json({
          point,
        });
      }
      return res.status(400).json({
        message: "Не все обязательные поля заполнены",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }

  async findPoint(req, res) {
    try {
      const { id } = req.query;
      if (id) {
        const point = await PointServices.findPointById(id);
        return res.status(200).json({
          point,
        });
      }
      return res.status(400).json({
        message: "Поле id не заполненно",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }

  async findAllPoints(req, res) {
    try {
      const points = await PointServices.findAllPoints();
      return res.status(200).json({
        points,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }
}
export default new PointController();
