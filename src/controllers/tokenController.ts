import { Request, Response } from 'express';
import { getStreamClient, config } from '../config/stream';
import {
  GenerateTokenRequest,
  TokenResponse,
  ApiResponse,
} from '../types';

export const generateToken = async (
  req: Request<{}, {}, GenerateTokenRequest>,
  res: Response<ApiResponse<TokenResponse>>
) => {
  try {
    const { userId, callId, callType = 'default', validityInSeconds } = req.body;

    const client = getStreamClient();
    
    // Generate user token with optional validity
    const token = client.generateUserToken({ 
      user_id: userId,
      validity_in_seconds: validityInSeconds || 3600 // Default 1 hour
    });

    res.json({
      success: true,
      data: {
        token,
        userId,
        apiKey: config.stream.apiKey,
        callId: callId || `call_${Date.now()}`,
        callType,
      },
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate token',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const generateCallToken = async (
  req: Request<{}, {}, GenerateTokenRequest>,
  res: Response<ApiResponse<TokenResponse>>
) => {
  try {
    const { userId, callId, callType = 'default', validityInSeconds, role } = req.body;

    if (!callId) {
      return res.status(400).json({
        success: false,
        error: 'callId is required',
      });
    }

    const client = getStreamClient();
    
    // Generate call token with call_cids
    const call_cids = [`${callType}:${callId}`];
    const tokenOptions: any = {
      user_id: userId,
      call_cids,
      validity_in_seconds: validityInSeconds || 3600, // Default 1 hour
    };
    
    // Optionally add role (admin, moderator, etc.)
    if (role) {
      tokenOptions.role = role;
    }
    
    const token = client.generateCallToken(tokenOptions);

    res.json({
      success: true,
      data: {
        token,
        userId,
        apiKey: config.stream.apiKey,
        callId,
        callType
      },
    });
  } catch (error) {
    console.error('Error generating call token:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate call token',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
