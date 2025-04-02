import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// For demo purposes, we'll create a mock payment intent
// In a real app, you would use a valid Stripe API key
export async function POST(request: Request) {
  try {
    const { amount, currency = 'inr' } = await request.json();

    // Create a mock client secret for demo purposes
    const mockClientSecret = `demo_${Date.now()}_secret_${Math.random().toString(36).substring(2, 15)}`;
    
    // Return a mock payment intent
    return NextResponse.json({ 
      clientSecret: mockClientSecret,
      amount: amount,
      currency: currency
    }, { status: 200 });
    
    /* Uncomment this in production with a valid API key
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in smallest currency unit (paise for INR)
      currency,
      payment_method_types: ['card'],
      metadata: {
        integration_check: 'accept_a_payment',
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    }, { status: 200 });
    */
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ 
      error: 'Error creating payment intent',
      // For demo purposes, return a mock client secret even on error
      clientSecret: `demo_error_${Date.now()}_secret_${Math.random().toString(36).substring(2, 15)}`
    }, { status: 200 }); // Return 200 for demo purposes
  }
} 