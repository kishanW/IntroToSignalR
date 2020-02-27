using System.Threading.Tasks;
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


	    public Task ClientMessageReceived(string message)
	    {
		    Clients.Caller.SendAsync("ReceiveServerMessage", $"Notifications hub received message: '{message}' from connectionId: {Context.ConnectionId}");
		    return Task.CompletedTask;
	    }

    }
}
