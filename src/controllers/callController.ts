import { Request, Response } from 'express';
import { getStreamClient } from '../config/stream';
import {
  CreateCallRequest,
  UpdateCallRequest,
  CallResponse,
  ApiResponse,
} from '../types';

export const createCall = async (
  req: Request<{}, {}, CreateCallRequest>,
  res: Response<ApiResponse<CallResponse>>
) => {
  try {
    const { callId, callType = 'default', createdBy, members, settings } = req.body;

    if (!createdBy) {
      return res.status(400).json({
        success: false,
        error: 'createdBy is required',
        message: 'The createdBy field (user ID) is required when creating a call',
      });
    }

    const client = getStreamClient();
    const call = client.video.call(callType, callId);

    const createOptions: any = {
      data: { created_by_id: createdBy },
    };
    if (members) createOptions.members = members;
    if (settings) createOptions.settings_override = settings;

    const response = await call.getOrCreate(createOptions);

    res.status(201).json({
      success: true,
      data: response as any,
      message: 'Call created successfully',
    });
  } catch (error) {
    console.error('Error creating call:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create call',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getCall = async (
  req: Request<{ callType: string; callId: string }>,
  res: Response<ApiResponse<CallResponse>>
) => {
  try {
    const { callType, callId } = req.params;

    const client = getStreamClient();
    const call = client.video.call(callType, callId);

    const response = await call.get();

    res.json({
      success: true,
      data: response as any,
    });
  } catch (error) {
    console.error('Error getting call:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get call',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateCall = async (
  req: Request<{ callType: string; callId: string }, {}, UpdateCallRequest>,
  res: Response<ApiResponse<CallResponse>>
) => {
  try {
    const { callType, callId } = req.params;
    const { settings } = req.body;

    const client = getStreamClient();
    const call = client.video.call(callType, callId);

    const response = await call.update({
      settings_override: settings as any,
    });

    res.json({
      success: true,
      data: response as any,
      message: 'Call updated successfully',
    });
  } catch (error) {
    console.error('Error updating call:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update call',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const endCall = async (
  req: Request<{ callType: string; callId: string }>,
  res: Response<ApiResponse>
) => {
  try {
    const { callType, callId } = req.params;

    const client = getStreamClient();
    const call = client.video.call(callType, callId);

    // End the call for everyone
    await call.end();

    res.json({
      success: true,
      message: 'Call ended successfully',
    });
  } catch (error) {
    console.error('Error ending call:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to end call',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const listCalls = async (
  req: Request,
  res: Response<ApiResponse<any[]>>
) => {
  try {
    const client = getStreamClient();
    
    const response = await client.video.queryCalls({
      filter_conditions: {},
      limit: 25,
    });

    res.json({
      success: true,
      data: response.calls,
    });
  } catch (error) {
    console.error('Error listing calls:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list calls',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
