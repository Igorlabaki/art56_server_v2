import axios from "axios";

//Get browser
export const api = getAPIClient()

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWQiOiJlZGZkMGQ5ZS05NmMzLTQ4M2YtYWMxYy03NzYxZGUyMmMzZDciLCJpYXQiOjE2Njc0ODcxNDEsImV4cCI6MzMzNTgzODI4Miwic3ViIjoiZWRmZDBkOWUtOTZjMy00ODNmLWFjMWMtNzc2MWRlMjJjM2Q3In0.3Qri1OPYvOUSmTMtug4M76_qgSYFkU_ehWfxocbP4kA"

// Get SSR
export function getAPIClient(ctx?: any) {

  const api = axios.create({
    baseURL: 'http://localhost:3333'
  })

  return api;
}