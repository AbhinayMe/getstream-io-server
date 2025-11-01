import { Request, Response } from 'express';
import { getStreamClient } from '../config/stream';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  ApiResponse,
} from '../types';

export const listUsers = async (
  req: Request,
  res: Response<ApiResponse<UserResponse[]>>
) => {
  try {
    const { limit = 25, offset = 0 } = req.query;

    const client = getStreamClient();
    const response = await client.queryUsers({
      payload: {
        filter_conditions: {},
        limit: Number(limit),
        offset: Number(offset),
      },
    });

    res.json({
      success: true,
      data: response.users as any[],
    });
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list users',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createUser = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response<ApiResponse<UserResponse>>
) => {
  try {
    const { id, name, image, role, custom } = req.body;

    const client = getStreamClient();
    
    const userData: any = { id };
    if (name) userData.name = name;
    if (image) userData.image = image;
    if (role) userData.role = role;
    if (custom) userData.custom = custom;

    const response = await client.upsertUsers([userData]);

    res.status(201).json({
      success: true,
      data: response.users[id] as any,
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateUser = async (
  req: Request<{ userId: string }, {}, UpdateUserRequest>,
  res: Response<ApiResponse<UserResponse>>
) => {
  try {
    const { userId } = req.params;
    const { name, image, custom } = req.body;

    const client = getStreamClient();
    
    const userData: any = { id: userId };
    if (name) userData.name = name;
    if (image) userData.image = image;
    if (custom) userData.custom = custom;

    const response = await client.upsertUsers([userData]);

    res.json({
      success: true,
      data: response.users[userId] as any,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getUser = async (
  req: Request<{ userId: string }>,
  res: Response<ApiResponse<UserResponse>>
) => {
  try {
    const { userId } = req.params;

    const client = getStreamClient();
    const response = await client.queryUsers({
      payload: {
        filter_conditions: { id: userId },
      },
    });

    if (!response.users || response.users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: response.users[0] as any,
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteUser = async (
  req: Request<{ userId: string }>,
  res: Response<ApiResponse>
) => {
  try {
    const { userId } = req.params;

    const client = getStreamClient();
    await client.deleteUsers({
      user_ids: [userId],
    });

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
