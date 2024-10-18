import { WebSocket } from 'ws'

interface ConnectionMetadata {
  userId: string
  role: string
  connectedAt: Date
  status: 'connected' | 'disconnected'
}

class ConnectionStore {
    private connections: Map<string, WebSocket>

    constructor() {
        this.connections = new Map<string, WebSocket>()
    }

    public set(socketId: string, connection: WebSocket): void {
        this.connections.set(socketId, connection)
    }

    public get(socketId: string): WebSocket | undefined {
        return this.connections.get(socketId)
    }

    public delete(socketId: string): boolean {
        return this.connections.delete(socketId)
    }

    public getAll(): Map<string, WebSocket> {
        return this.connections
    }

    public getAllIds(): string[] {
        return Array.from(this.connections.keys())
    }

    public size(): number {
        return this.connections.size
    }

    public clear(): void {
        this.connections.clear()
    }

    public has(socketId: string): boolean {
        return this.connections.has(socketId)
    }
}

// singleton instance
const connectionStore = new ConnectionStore()

export { connectionStore }
export type { ConnectionMetadata }
