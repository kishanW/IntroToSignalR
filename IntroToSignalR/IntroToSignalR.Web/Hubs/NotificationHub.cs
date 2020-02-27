using Microsoft.AspNetCore.SignalR;

namespace IntroToSignalR.Web.Hubs
{
	//use this to strongly type the client-side methods for when server calls them
	public interface INotificationHub
	{
	}


	public class NotificationHub
		: Hub //uncomment this if you do not care about strongly typing client-side methods
		//Hub<INotificationHub> //enable this to make sure client side methods are strongly typed when called from server
    {

    }
}
