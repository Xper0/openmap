import mapRoutes from "../models/createMapRouter.js";





const getRoutes = async (req,res) => {
  try {
    // let geoJSON = await mapOsm.find({})
    const routes = await mapRoutes.find({})
    res.json({
      status: "ok",
      result: routes,
    })
  }catch (e) {
    res.json({
      status: "ok",
      msg: "Маршрут не найден",
    })
  }

}

const createRoute = async (req, res) => {
  try {
    const { route } = JSON.parse(req.body);
    await mapRoutes.create(route)
    res.json({
      status: "ok",
      msg: "Маршрут добавлен"
    })
  }catch (err) {
    res.json({
      status: "ok",
      msg: "Ошибка маршрута"
    })
  }

}


export { getRoutes, createRoute };