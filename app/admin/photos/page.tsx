"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Star, AlertCircle, ArrowLeft } from "lucide-react"
import { getCurrentUser, isAdmin } from "@/lib/auth-utils"

type Photo = {
  id: string
  image_url: string
  caption: string | null
  location: string | null
  status: "pending" | "approved" | "rejected"
  featured: boolean
  created_at: string
  user_id: string
}

export default function AdminPhotosPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [moderationDialogOpen, setModerationDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [featured, setFeatured] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userIsAdmin, setUserIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = getCurrentUser()
      if (!user || !user.id) {
        router.push("/login")
        return
      }

      const adminStatus = await isAdmin(user.id)
      setUserIsAdmin(adminStatus)

      if (!adminStatus) {
        router.push("/dashboard")
      } else {
        fetchPhotos(activeTab)
      }
    }

    checkAdminStatus()
  }, [router])

  const fetchPhotos = async (status: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/photos?status=${status}&limit=50`)

      if (!response.ok) {
        throw new Error("Failed to fetch photos")
      }

      const data = await response.json()
      setPhotos(data.photos || [])
    } catch (error: any) {
      console.error("Error fetching photos:", error)
      setError(error.message || "An error occurred while fetching photos")
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    fetchPhotos(value)
  }

  const openModerationDialog = (photo: Photo) => {
    setSelectedPhoto(photo)
    setFeatured(photo.featured)
    setRejectionReason("")
    setModerationDialogOpen(true)
  }

  const handleModeration = async (status: "approved" | "rejected") => {
    if (!selectedPhoto) return

    const user = getCurrentUser()
    if (!user || !user.id) {
      setError("You must be logged in to moderate photos")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/photos/moderate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photo_id: selectedPhoto.id,
          status,
          featured: status === "approved" ? featured : false,
          rejection_reason: status === "rejected" ? rejectionReason : null,
          moderator_id: user.id,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || `Failed to ${status} photo`)
      }

      // Remove the moderated photo from the list
      setPhotos(photos.filter((photo) => photo.id !== selectedPhoto.id))
      setModerationDialogOpen(false)
    } catch (error: any) {
      console.error(`Error ${status} photo:`, error)
      setError(error.message || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!userIsAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex items-center justify-center">
        <div className="text-white">Checking permissions...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
        <Button asChild variant="ghost" className="text-white hover:bg-white/10">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Photo Moderation</h1>
            <p className="text-white/80">Review and moderate user-submitted photos</p>
          </div>

          {error && (
            <div className="p-4 mb-6 bg-red-500/20 border border-red-500/30 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <span className="text-white">{error}</span>
            </div>
          )}

          <Tabs defaultValue="pending" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="bg-white/10 text-white mb-6">
              <TabsTrigger value="pending" className="data-[state=active]:bg-white/20">
                Pending
              </TabsTrigger>
              <TabsTrigger value="approved" className="data-[state=active]:bg-white/20">
                Approved
              </TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-white/20">
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6">
              {loading ? (
                <div className="text-center py-12 text-white">Loading photos...</div>
              ) : photos.length === 0 ? (
                <div className="text-center py-12 text-white">No pending photos to moderate</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden bg-white/5 border-white/10">
                      <div className="relative aspect-square">
                        <Image
                          src={photo.image_url || "/placeholder.svg"}
                          alt={photo.caption || "User submitted photo"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-300/30">
                            Pending
                          </Badge>
                        </div>
                        {photo.caption && <p className="text-white/90 text-sm mb-2">{photo.caption}</p>}
                        {photo.location && <p className="text-white/60 text-xs mb-3">📍 {photo.location}</p>}
                        <p className="text-white/60 text-xs mb-4">
                          By User • {new Date(photo.created_at).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                            onClick={() => openModerationDialog(photo)}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1"
                            onClick={() => openModerationDialog(photo)}
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="approved" className="mt-6">
              {loading ? (
                <div className="text-center py-12 text-white">Loading photos...</div>
              ) : photos.length === 0 ? (
                <div className="text-center py-12 text-white">No approved photos</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden bg-white/5 border-white/10">
                      <div className="relative aspect-square">
                        <Image
                          src={photo.image_url || "/placeholder.svg"}
                          alt={photo.caption || "User submitted photo"}
                          fill
                          className="object-cover"
                        />
                        {photo.featured && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-amber-500 text-white">
                              <Star className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-300/30">
                            Approved
                          </Badge>
                        </div>
                        {photo.caption && <p className="text-white/90 text-sm mb-2">{photo.caption}</p>}
                        {photo.location && <p className="text-white/60 text-xs mb-3">📍 {photo.location}</p>}
                        <p className="text-white/60 text-xs">
                          By User • {new Date(photo.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="rejected" className="mt-6">
              {loading ? (
                <div className="text-center py-12 text-white">Loading photos...</div>
              ) : photos.length === 0 ? (
                <div className="text-center py-12 text-white">No rejected photos</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden bg-white/5 border-white/10">
                      <div className="relative aspect-square">
                        <Image
                          src={photo.image_url || "/placeholder.svg"}
                          alt={photo.caption || "User submitted photo"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2">
                          <Badge variant="outline" className="bg-red-500/20 text-red-300 border-red-300/30">
                            Rejected
                          </Badge>
                        </div>
                        {photo.caption && <p className="text-white/90 text-sm mb-2">{photo.caption}</p>}
                        {photo.location && <p className="text-white/60 text-xs mb-3">📍 {photo.location}</p>}
                        <p className="text-white/60 text-xs">
                          By User • {new Date(photo.created_at).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Moderation Dialog */}
      <Dialog open={moderationDialogOpen} onOpenChange={setModerationDialogOpen}>
        <DialogContent className="bg-white/5 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Moderate Photo</DialogTitle>
          </DialogHeader>

          {selectedPhoto && (
            <div className="space-y-4">
              <div className="relative aspect-square w-full max-h-[300px] rounded-md overflow-hidden">
                <Image
                  src={selectedPhoto.image_url || "/placeholder.svg"}
                  alt={selectedPhoto.caption || "User submitted photo"}
                  fill
                  className="object-cover"
                />
              </div>

              {selectedPhoto.caption && (
                <div>
                  <h4 className="text-sm font-medium text-white/80 mb-1">Caption:</h4>
                  <p className="text-white/90">{selectedPhoto.caption}</p>
                </div>
              )}

              {selectedPhoto.location && (
                <div>
                  <h4 className="text-sm font-medium text-white/80 mb-1">Location:</h4>
                  <p className="text-white/90">{selectedPhoto.location}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-white/80 mb-1">Submitted by:</h4>
                <p className="text-white/90">User</p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="featured"
                  checked={featured}
                  onCheckedChange={(checked) => setFeatured(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="featured" className="text-sm font-medium">
                    Feature on landing page
                  </Label>
                  <p className="text-sm text-white/60">
                    Featured photos will be displayed prominently on the landing page
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection reason (required if rejecting)</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Explain why this photo is being rejected"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </div>

              <DialogFooter className="flex gap-2 pt-4">
                <Button
                  variant="destructive"
                  onClick={() => handleModeration("rejected")}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleModeration("approved")}
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
