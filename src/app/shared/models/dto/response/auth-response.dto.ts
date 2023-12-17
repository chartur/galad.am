import { User } from "@interfaces/user";

export interface AuthResponseDto {
  user: User,
  token: string
}
