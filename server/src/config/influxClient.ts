import { InfluxDBClient } from '@influxdata/influxdb3-client'

export const client = new InfluxDBClient({
	host: process.env.INFLUX_URL,
	token: process.env.INFLUXDB_TOKEN
})



