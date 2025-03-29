'use server'

import { kv } from '@vercel/kv'
import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:ravengame762@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

export async function subscribeUser(sub: PushSubscription) {
  try {
    // Store subscription in KV store with a unique key
    const subscriptionId = crypto.randomUUID()
    await kv.set(`push_subscription:${subscriptionId}`, JSON.stringify(sub))
    return { success: true, subscriptionId }
  }
  catch (error) {
    console.error('Error storing subscription:', error)
    return { success: false, error: 'Failed to store subscription' }
  }
}

export async function unsubscribeUser(subscriptionId: string) {
  try {
    await kv.del(`push_subscription:${subscriptionId}`)
    return { success: true }
  }
  catch (error) {
    console.error('Error removing subscription:', error)
    return { success: false, error: 'Failed to remove subscription' }
  }
}

export async function sendNotification(message: string, subscriptionId: string) {
  try {
    const subscriptionStr = await kv.get(`push_subscription:${subscriptionId}`)
    if (!subscriptionStr) {
      throw new Error('Subscription not found')
    }

    const subscription = JSON.parse(subscriptionStr as string) as {
      endpoint: string
      keys: { p256dh: string, auth: string }
    }
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Jeviz Notification',
        body: message,
        icon: '/icons/icon-192x192.png',
      }),
    )
    return { success: true }
  }
  catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}
