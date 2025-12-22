# Phase 5: Migrate Live Channel Experience

## Objective
Convert the live channel page and related components (NetworkQuality, ParticipantList) to use Shadcn components and Lucide icons, creating a professional video conferencing experience.

## Files to Update

1. `client/src/pages/Channel/ChannelPage.tsx`
2. `client/src/components/NetworkQuality/NetworkQuality.tsx`
3. `client/src/components/ParticipantList/ParticipantList.tsx`

## New Components Needed

If not already created in Phase 1:
- `Dialog` component (for ParticipantList modal)
- `Badge` component (for network quality, status)
- `Avatar` component (for participants)

## Steps

### 1. Migrate ChannelPage
- Replace emoji control buttons with `ChannelControls` component (already created)
- Add `<Badge>` for network quality indicator
- Add `<Card>` for video containers (optional, may use plain divs)
- Update loading state with proper message or Skeleton
- Update error state with Alert component
- Apply Tailwind grid layout for video streams
- Use design tokens for backgrounds and borders

### 2. Migrate NetworkQuality Component
- Convert to use `<Badge>` component
- Add Lucide icon: `Wifi`, `WifiOff`, `Signal`, `SignalHigh`, `SignalLow`
- Color coding with design tokens:
  - Excellent/Good: `bg-green-500` or success variant
  - Fair: `bg-yellow-500` or warning variant  
  - Poor/Bad: `bg-destructive`
- Consider adding Tooltip for detailed info

### 3. Migrate ParticipantList to Dialog
- Convert modal to use Shadcn `<Dialog>` component
- Add `<Avatar>` for each participant
- Add `<Badge>` for host/status indicators
- Add Lucide icons: `Users`, `Mic`, `MicOff`, `Video`, `VideoOff`, `Crown` (for host)
- Use design tokens for colors
- Scrollable list with proper spacing

## Design Considerations

### ChannelPage Layout
```tsx
<div className="h-screen flex flex-col bg-background">
  {/* Header */}
  <div className="border-b border-border p-4 flex items-center justify-between">
    <h2 className="text-xl font-semibold">Live Channel</h2>
    <div className="flex items-center gap-4">
      <NetworkQuality client={client} />
      <Button variant="destructive" onClick={handleLeave}>
        <PhoneOff className="size-4 mr-2" />
        Leave
      </Button>
    </div>
  </div>

  {/* Video Grid */}
  <div className="flex-1 p-4 overflow-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {remoteUsers.map(user => (
        <div key={user.uid} className="aspect-video bg-muted rounded-lg relative">
          <div id={`remote-player-${user.uid}`} className="w-full h-full" />
          <div className="absolute bottom-2 left-2">
            <Badge>{user.uid}</Badge>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Local Video - Picture-in-Picture */}
  <div className="fixed bottom-24 right-4 w-48 aspect-video bg-muted rounded-lg border-2 border-primary">
    <div id="local-player" className="w-full h-full rounded-lg" />
    <Badge className="absolute bottom-2 left-2">You</Badge>
  </div>

  {/* Controls */}
  <ChannelControls
    audioMuted={audioMuted}
    videoMuted={videoMuted}
    isScreenSharing={isScreenSharing}
    onToggleAudio={toggleAudio}
    onToggleVideo={toggleVideo}
    onToggleScreenShare={toggleScreenShare}
    onShowParticipants={() => setShowParticipants(true)}
    onLeave={handleLeave}
    participantCount={remoteUsers.length + 1}
  />
</div>
```

### NetworkQuality Badge
```tsx
<Badge variant={getQualityVariant(quality)}>
  {getQualityIcon(quality)}
  <span className="ml-1">{qualityLabel}</span>
</Badge>

function getQualityIcon(quality: number) {
  if (quality <= 2) return <SignalHigh className="size-3" />;
  if (quality <= 4) return <Signal className="size-3" />;
  return <SignalLow className="size-3" />;
}
```

### ParticipantList Dialog
```tsx
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Users className="size-5" />
        Participants ({participants.length})
      </DialogTitle>
    </DialogHeader>
    
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {/* Local user */}
      <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
        <Avatar>
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-medium">You</p>
          <p className="text-sm text-muted-foreground">ID: {localUserId}</p>
        </div>
        <Badge>
          <Crown className="size-3 mr-1" />
          Host
        </Badge>
      </div>

      {/* Remote users */}
      {participants.map(user => (
        <div key={user.uid} className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg">
          <Avatar>
            <AvatarFallback>{user.uid.toString()[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">User {user.uid}</p>
            <p className="text-sm text-muted-foreground">ID: {user.uid}</p>
          </div>
          <div className="flex gap-1">
            {user.hasAudio ? (
              <Mic className="size-4 text-green-500" />
            ) : (
              <MicOff className="size-4 text-muted-foreground" />
            )}
            {user.hasVideo ? (
              <Video className="size-4 text-green-500" />
            ) : (
              <VideoOff className="size-4 text-muted-foreground" />
            )}
          </div>
        </div>
      ))}
    </div>
  </DialogContent>
</Dialog>
```

## Acceptance Criteria

### ChannelPage
- [ ] All control buttons use ChannelControls component
- [ ] Video grid uses Tailwind grid layout
- [ ] Local video in picture-in-picture style
- [ ] Network quality indicator visible
- [ ] Loading state displays properly
- [ ] Error state uses Alert component
- [ ] All icons are Lucide icons
- [ ] Design tokens used for colors
- [ ] Video/audio controls work
- [ ] Screen sharing works
- [ ] Leave channel works
- [ ] Responsive on mobile

### NetworkQuality
- [ ] Uses Badge component
- [ ] Shows appropriate icon based on quality
- [ ] Color coded with design tokens
- [ ] Updates in real-time
- [ ] Tooltip with details (optional)

### ParticipantList
- [ ] Uses Dialog component
- [ ] Each participant has Avatar
- [ ] Host has Crown badge
- [ ] Shows mic/video status with icons
- [ ] Scrollable when many participants
- [ ] Proper spacing and layout
- [ ] Can be closed with X button
- [ ] Can be closed by clicking outside
- [ ] Shows participant count in title

### All Components
- [ ] No emojis remaining
- [ ] All Lucide icons
- [ ] Design tokens used
- [ ] Mobile responsive
- [ ] No TypeScript errors
- [ ] Smooth transitions

## Testing Checklist

### ChannelPage
- [ ] Join a channel
- [ ] Verify local video appears
- [ ] Toggle microphone on/off
- [ ] Toggle camera on/off
- [ ] Start screen share
- [ ] Stop screen share
- [ ] Open participants list
- [ ] Leave channel
- [ ] Join with another user (if possible)
- [ ] Verify remote video appears
- [ ] Check network quality indicator updates

### NetworkQuality
- [ ] Displays on channel page
- [ ] Shows correct quality level
- [ ] Icon matches quality
- [ ] Color matches quality

### ParticipantList
- [ ] Opens when clicking participants button
- [ ] Shows local user as host
- [ ] Shows remote users
- [ ] Shows correct participant count
- [ ] Mic/video icons update based on state
- [ ] Can scroll if many participants
- [ ] Closes on X click
- [ ] Closes on outside click

## Status
📝 **PLANNING** - Waiting for Phase 4 completion

## Estimated Time
5.5 hours (2h ChannelPage, 1h NetworkQuality, 2.5h ParticipantList + Dialog)

## Notes
- Dialog component needs @radix-ui/react-dialog dependency
- Avatar component needs @radix-ui/react-avatar dependency
- Test with actual video/audio if possible
- ParticipantList is critical UX - make it polished
- ChannelControls already done - just integrate it
- Consider adding loading skeleton for video tiles

## Status
✅ **DONE** - Both Landing and ChannelPage migrated successfully

## Completed Tasks

### Landing Page
- [x] Hero section with large Video icon
- [x] All buttons use Shadcn `<Button>`
- [x] Features section with icon cards
- [x] Icons added (`Video`, `Shield`, `Zap`, `Users`, `ArrowRight`)
- [x] Three feature cards in responsive grid
- [x] CTA section with call-to-action
- [x] Proper spacing and typography
- [x] Mobile responsive layout
- [x] Design tokens used throughout

### Channel Page (Live Experience)
- [x] Control bar with Shadcn buttons
- [x] All icons replaced with Lucide (`Video`, `VideoOff`, `Mic`, `MicOff`, `MonitorUp`, `PhoneOff`, `UsersIcon`, `Wifi`, `WifiOff`, `ArrowLeft`)
- [x] Video grid responsive layout
- [x] Local video as picture-in-picture (fixed bottom-right)
- [x] Fixed control bar at bottom center
- [x] Button variants based on state (destructive for muted, default for active)
- [x] Participant count badge on users button
- [x] Empty state with icon and message
- [x] Error state with card layout
- [x] Loading state with animated icon
- [x] Header with network quality indicator
- [x] All controls functional (audio, video, screen share, leave)
- [x] Proper video container aspect ratios
- [x] User labels on videos

### Design Features
- [x] Control bar: Rounded pill with shadow, centered at bottom
- [x] Button groups separated by dividers
- [x] Icon buttons with proper sizes (`size="icon"`)
- [x] Local video: Fixed position, border-primary, shadow
- [x] Remote videos: Grid layout with aspect-video
- [x] User labels: Semi-transparent backgrounds with backdrop blur
- [x] Participant count: Badge with absolute positioning
- [x] Loading: Animated pulse effect
- [x] Error: Centered card with icon

**Actual Time**: ~45 minutes
