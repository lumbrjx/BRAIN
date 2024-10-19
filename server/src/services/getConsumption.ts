import { client } from "src/config/influxClient"

export async function getPowerConsumptionByMachine() {
    const queryClient = client.getQueryApi("myorg")
    
    const fluxQuery = `
        from(bucket: "machines_logs")
            |> range(start: -15m)
            |> filter(fn: (r) => r._field == "power_consumption")
    `

    return new Promise((resolve, reject) => {
        const readings: any[] = []
        
        queryClient.queryRows(fluxQuery, {
            next: (row, tableMeta) => {
                const rowData = tableMeta.toObject(row)
                readings.push({
                    time: new Date(rowData['_time']),
                    machine: rowData['_measurement'],
                    power_consumption: rowData['_value']
                })
            },
            error: (error) => {
                console.error('Error querying power consumption:', error)
                reject(error)
            },
            complete: () => {
                resolve(readings)
            },
        })
    })
}

// Usage:
// const powerReadings = await getPowerConsumptionByMachine()
// powerReadings will look like:
// [
//   { time: "2024-10-19T11:00:00Z", machine: "stamping_press_001", power_consumption: 2500 },
//   { time: "2024-10-19T11:00:00Z", machine: "painting_robot_002", power_consumption: 1800 },
//   ...
// ]
