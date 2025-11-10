import { NextResponse } from 'next/server';
import { 
  isDatabaseHealthy, 
  getConnectionStatus, 
  ensureConnection 
} from '@/lib/db';

/**
 * GET /api/health/database
 * Check database connection health
 */
export async function GET() {
  try {
    const status = getConnectionStatus();
    const isHealthy = await isDatabaseHealthy();

    if (isHealthy) {
      return NextResponse.json({
        success: true,
        status: 'healthy',
        connected: status.connected,
        environment: status.environment,
        timestamp: new Date().toISOString(),
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        status: 'unhealthy',
        connected: status.connected,
        environment: status.environment,
        timestamp: new Date().toISOString(),
      }, { status: 503 }); // Service Unavailable
    }
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      success: false,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

/**
 * POST /api/health/database
 * Attempt to reconnect to database
 */
export async function POST() {
  try {
    await ensureConnection();
    const isHealthy = await isDatabaseHealthy();

    if (isHealthy) {
      return NextResponse.json({
        success: true,
        message: 'Database connection restored',
        timestamp: new Date().toISOString(),
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to restore database connection',
        timestamp: new Date().toISOString(),
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Reconnection error:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
