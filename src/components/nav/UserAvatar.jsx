import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserAvatar = ({ imageUrl, name }) => {
    const fallbackInitials = name
    ? name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "UN"; // "UN" for Unknown User

  return (
    <Avatar>
      <AvatarImage src={imageUrl ?? undefined} alt={name ?? "User"} />
      <AvatarFallback className="bg-gray-400 text-white">{fallbackInitials}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar