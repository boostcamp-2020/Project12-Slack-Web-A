import {
  createAction,
  ActionType,
  createReducer,
  createAsyncAction,
} from 'typesafe-actions'
import { AxiosError } from 'axios'

export interface WorkspaceType extends Object {
  id: number
  name: string
  imageUrl: string
}

export interface JoinWorkspaceType {
  workspaceId: number
}

export interface WorkspaceState {
  workspaceList: WorkspaceType[]
  loading: boolean
  error: AxiosError | null
}

const initialState: WorkspaceState = {
  workspaceList: [],
  loading: true,
  error: null,
}

export const GET_WORKSPACES = 'workspace/GET_LOADING' as const
const GET_WORKSPACES_SUCCESS = 'workspace/GET_SUCCESS' as const
const GET_WORKSPACES_ERROR = 'workspace/GET_ERROR' as const
export const CREATE_WORKSPACE = 'workspace/CREATE_WORKSPACE' as const
export const JOIN_WORKSPACE = 'workspace/JOIN_WORKSPACE' as const

export const getWorkspaceLoading = createAction(GET_WORKSPACES)()
export const getWorkspaceSuccess = createAction(GET_WORKSPACES_SUCCESS)<
  WorkspaceType[]
>()
export const getWorkspaceError = createAction(GET_WORKSPACES_ERROR)<
  AxiosError
>()
export const createWorkspace = createAction(CREATE_WORKSPACE)<WorkspaceType>()
export const joinWorkspace = createAction(JOIN_WORKSPACE)<JoinWorkspaceType>()

export const getWorkspaceAsync = createAsyncAction(
  GET_WORKSPACES,
  GET_WORKSPACES_SUCCESS,
  GET_WORKSPACES_ERROR,
)<number, WorkspaceType[], AxiosError>()

const actions = {
  getWorkspaceLoading,
  getWorkspaceSuccess,
  getWorkspaceError,
  createWorkspace,
  joinWorkspace,
}

export type WorkspaceAction = ActionType<typeof actions>

const reducer = createReducer<WorkspaceState, WorkspaceAction>(initialState, {
  [GET_WORKSPACES]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_WORKSPACES_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    workspaceList: action.payload,
  }),
  [GET_WORKSPACES_ERROR]: (state, action) => ({
    ...state,
    workspaceList: [],
    loading: false,
    error: action.payload,
  }),
})

export default reducer