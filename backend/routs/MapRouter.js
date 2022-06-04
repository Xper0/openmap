import express from "express";
import path from "path";
import {createRoute, getRoutes} from "../controller/mapController.js";

const mapRouter = express.Router()
const __dirname = path.dirname(process.argv[1])


mapRouter.get("/createRoute", getRoutes)
         .post("/createRoute", createRoute)


// mapRouter.get("/Map",  async (req, res) => {
//
//   // let file = path.join(__dirname, "/m3.osm")
//   // let open = fs.readFileSync(path.join(__dirname, "/centrals.osm"), "utf8");
//   // // // console.log(open)
//   // // //
//   // const parser = new DomParser();
//   // const doc = parser.parseFromString(open, "text/xml");
//   // let osmFile = doc.rawHTML
//   // // // console.log(osmFile)
//   // // // console.log(osmtogeojson)
//   // // //   let geoJson = osmtogeojson(osmFile);
//   // let geoJson =  osm.osm2geojson(osmFile)
//   // console.log(geoJson)
//   // // await mapOsm.create(geoJson)
//   // // console.log(geoJson)
//   let geoJSON = await mapOsm.find({})
//   //
//   // const map = new Map({
//   //   layers: [
//   //     new TileLayer({
//   //       source: new OSM(),
//   //     }),
//   //   ],
//   //   target: 'map',
//   //   view: new View({
//   //     center: [0, 0],
//   //     zoom: 2,
//   //   }),
//   // });
//   // console.log(map)
//   //   // var map = L.map('map').setView([51.505, -0.09], 13);
//   // // console.log(map)
//   // console.log(geoJSON)
//   // let tileIndex = geojsonvt.(geoJSON[0]._doc.features);
//   // console.log(tileIndex)
//
//   res.json({
//     status: "ok",
//     result: geoJSON
//   })
// })
// mapRouter.post("/createRoute", createRoute)



export default mapRouter;