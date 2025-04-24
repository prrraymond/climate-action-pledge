"use client"

// Simple toast hook for notifications
// In a real app, you might use a more robust solution like react-hot-toast or react-toastify

import { useState } from "react"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  title: string
  description?: string
  type?: ToastType
  duration?: number
}

interface Toast extends ToastOptions {
  id: string
  visible: boolean
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      title: options.title,
      description: options.description,
      type: options.type || "info",
      duration: options.duration || 3000,
      visible: true,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, newToast.duration)

    return id
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    toast,
    dismissToast,
    toasts,
  }
}
