const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(body = {}, page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  let rows;
  if (Object.keys(body).length > 0) {

    const {site_city} = body;
    rows = await db.query(
        `SELECT fm_tx.id, sites.itu, sites.region, sites.city, sites.detailed_name, sites.lat, sites.lon, fm_tx.freq, fm_tx.ant_height, fm_tx.ant_pol, 
        fm_tx.erp, fm_tx.station, fm_tx.reg_prog, fm_tx.pi, fm_tx.pi_reg, fm_tx.ps, fm_tx.ps_reg, fm_tx.ant_pattern
        FROM fm_tx
        LEFT JOIN sites ON sites.id=fm_tx.site_id
        WHERE sites.city="${site_city}"
        LIMIT ${offset},${config.listPerPage}`
    );
  } else {
    rows = await db.query(
      `SELECT fm_tx.id, sites.itu, sites.region, sites.city, sites.detailed_name, sites.lat, sites.lon, fm_tx.freq, fm_tx.ant_height, fm_tx.ant_pol, 
      fm_tx.erp, fm_tx.station, fm_tx.reg_prog, fm_tx.pi, fm_tx.pi_reg, fm_tx.ps, fm_tx.ps_reg, fm_tx.ant_pattern
      FROM fm_tx
      LEFT JOIN sites ON sites.id=fm_tx.site_id
      LIMIT ${offset},${config.listPerPage}`
    );
  }
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function postMultiple(body = {}){

  for (const rec of body['entries']) {
    if (rec.hasOwnProperty('itu') && rec.hasOwnProperty('city') && rec.hasOwnProperty('lat') && rec.hasOwnProperty('lon') && rec.hasOwnProperty('freq')) {
      //Set our vals
      itu = rec["itu"];
      city = rec["city"];
      lat = rec["lat"];
      lon = rec["lon"];
      freq = rec["freq"];
      region = rec.hasOwnProperty('region') ? rec['region'] : '';
      detailed_name = rec.hasOwnProperty('detailed_name') ? rec['detailed_name'] : '';
      ant_height = rec.hasOwnProperty('ant_height') ? rec['ant_height'] : '';
      ant_pol = rec.hasOwnProperty('ant_pol') ? rec['ant_pol'] : '';
      erp = rec.hasOwnProperty('erp') ? rec['erp'] : '';
      station = rec.hasOwnProperty('station') ? rec['station'] : '';
      reg_prog = rec.hasOwnProperty('reg_prog') ? rec['reg_prog'] : '';
      pi = rec.hasOwnProperty('pi') ? rec['pi'] : '';
      pi_reg = rec.hasOwnProperty('pi_reg') ? rec['pi_reg'] : '';
      ps = rec.hasOwnProperty('ps') ? rec['ps'] : [];
      ps_reg = rec.hasOwnProperty('ps_reg') ? rec['ps_reg'] : [];
      //Look for the site by lat lon data
      query = `SELECT id FROM sites WHERE FORMAT(lat,4)=FORMAT(${lat},4) AND FORMAT(lon,4)=FORMAT(${lon},4)`;
      find_site = await db.query(query);
      site_data = helper.emptyOrRows(find_site);
  
      if (site_data.length === 0) {
        //if array is empty, this site is new, so insert
        query = `INSERT INTO sites (itu, region, city, detailed_name, lat, lon) VALUES ("${itu}", "${region}", "${city}", "${detailed_name}", ${lat}, ${lon})`
        insert_site = await db.query(query);
        site_id = insert_site['insertId'];
      } else {
        site_id = site_data[0]['id'];
      }
  
      query = `INSERT INTO fm_tx (site_id, freq, ant_height, ant_pol, erp, station, reg_prog, pi, pi_reg, ps, ps_reg) 
      VALUES (${site_id}, ${freq}, ${ant_height}, "${ant_pol}", ${erp}, "${station}", "${reg_prog}", "${pi}", "${pi_reg}", '${JSON.stringify(ps)}', '${JSON.stringify(ps_reg)}')`
      insert_tx = await db.query(query);
    } else {
      const err = new Error('Minimum required values are itu, city, lat, lon and freq');
      return {"error": err.message};
    }
  }
}

module.exports = {
  getMultiple,
  postMultiple
}