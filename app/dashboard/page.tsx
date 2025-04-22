import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, Clock, Leaf, Trophy, Users, Share2 } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/actions">My Pledges</Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
              JS
            </div>
            <span className="text-white">Jane Smith</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Your Climate Impact</h1>
              <p className="text-white/80 mt-2">Track your progress and see your positive impact</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Share2 className="h-4 w-4 mr-2" />
                Share My Impact
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Link href="/actions">Update Pledges</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-white/60">Your Carbon Reduction</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <span>245 kg CO₂e</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-white/60">Equivalent to planting 12 trees</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-white/60">Active Streak</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                  <span>28 Days</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-white/60">Keep it up! You're building great habits</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-white/60">Community Rank</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-emerald-400" />
                  <span>Top 15%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-white/60">Among 12,453 active pledgers</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="progress" className="mb-12">
            <TabsList className="bg-white/10 text-white">
              <TabsTrigger value="progress" className="data-[state=active]:bg-white/20">
                Progress
              </TabsTrigger>
              <TabsTrigger value="impact" className="data-[state=active]:bg-white/20">
                Impact
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-white/20">
                Community
              </TabsTrigger>
            </TabsList>
            <TabsContent value="progress" className="mt-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Your Pledge Progress</CardTitle>
                  <CardDescription className="text-white/60">
                    You've completed 8 out of 14 pledged actions this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm font-medium text-white">Energy</div>
                        <div className="text-sm text-white/60">3/4 actions</div>
                      </div>
                      <Progress value={75} className="h-2 bg-white/10" indicatorClassName="bg-emerald-500" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm font-medium text-white">Transportation</div>
                        <div className="text-sm text-white/60">2/3 actions</div>
                      </div>
                      <Progress value={67} className="h-2 bg-white/10" indicatorClassName="bg-emerald-500" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm font-medium text-white">Food</div>
                        <div className="text-sm text-white/60">1/3 actions</div>
                      </div>
                      <Progress value={33} className="h-2 bg-white/10" indicatorClassName="bg-emerald-500" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm font-medium text-white">Water</div>
                        <div className="text-sm text-white/60">2/2 actions</div>
                      </div>
                      <Progress value={100} className="h-2 bg-white/10" indicatorClassName="bg-emerald-500" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="text-sm font-medium text-white">Consumption</div>
                        <div className="text-sm text-white/60">0/2 actions</div>
                      </div>
                      <Progress value={0} className="h-2 bg-white/10" indicatorClassName="bg-emerald-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="mt-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Your Environmental Impact</CardTitle>
                  <CardDescription className="text-white/60">
                    Estimated impact of your actions over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <BarChart className="h-16 w-16 text-white/40" />
                    <div className="ml-4 text-white/60">Impact visualization would appear here</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Community Activity</CardTitle>
                  <CardDescription className="text-white/60">
                    See what others in the community are doing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium shrink-0">
                        MK
                      </div>
                      <div>
                        <div className="text-sm font-medium">Michael K. completed 5 actions today</div>
                        <div className="text-xs text-white/60 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" /> 2 hours ago
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium shrink-0">
                        AL
                      </div>
                      <div>
                        <div className="text-sm font-medium">Aisha L. started a 30-day plant-based challenge</div>
                        <div className="text-xs text-white/60 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" /> 5 hours ago
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-medium shrink-0">
                        JT
                      </div>
                      <div>
                        <div className="text-sm font-medium">James T. reached 100 days of climate action</div>
                        <div className="text-xs text-white/60 flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1" /> 1 day ago
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Users className="h-4 w-4 mr-2" />
                        View All Community Activity
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
