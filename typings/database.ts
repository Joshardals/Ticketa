// Interface representing the parameters needed to create or manage user information.
// This includes basic user details such as ID, email, name, and username.
export interface UserInfoParams {
  // Unique identifier for the user.
  userId: string;

  // Email address of the user.
  email: string;

  // Full name of the user.
  name: string;

  // Username chosen by the user.
  username: string;
}

// Interface representing the parameters needed to create or manage ticket information.
// This includes details about the event and the ticket price.
export interface TicketParams {
  // Name of the event for which the ticket is purchased.
  eventName: string;

  // Unique identifier for the event.
  eventId: string;

  // Price of the ticket in dollars.
  price: number;
}
