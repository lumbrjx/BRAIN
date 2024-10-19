import { InfluxDB } from '@influxdata/influxdb-client'

export const client = new InfluxDB({
	url: process.env.INFLUX_URL,
	token: process.env.INFLUXDB_TOKEN
})





