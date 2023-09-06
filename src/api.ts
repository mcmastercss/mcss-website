import type { PayloadCollection } from "./types";
import qs from "qs";
import type { Post, Pfp } from "./payload-types";

function apiFetch(url: string, options: any = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  return fetch(url, mergedOptions).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(
      `Error fetching page data: ${res.statusText} (${res.status})}`
    );
  });
}

async function getTable<T>(
  table: string,
  query: any = null
): Promise<PayloadCollection<T>> {
  const stringifiedQuery = qs.stringify(
    { where: query },
    { addQueryPrefix: true }
  );
  const data = await apiFetch(
    `${import.meta.env.PAYLOAD_URL}/api/${table}/${stringifiedQuery}`
  );
  return data;
}

// fetches all posts if no query is passed (not good when there are many)
export async function getPosts(
  query: any = null
): Promise<PayloadCollection<Post>> {
  return getTable<Post>("posts", query);
}

// fetches profile pictures from every user
export async function getPfps(
  query: any = null
): Promise<PayloadCollection<Pfp>> {
  return getTable<Pfp>("pfps", query);
}

export async function getUpcomingEvent(): Promise<Post> {
  const currentDate = new Date();

  const query = {
    and: [
      {
        status: {
          equals: "published",
        },
        "category.name": {
          equals: "Event",
        },
        eventStartTime: {
          not_equals: null,
        },
        eventEndTime: {
          greater_than: currentDate.toISOString(),
        },
      },
    ],
  };

  const posts = await getPosts(query);

  const upcomingEvent = posts.docs.reduce((closestEvent: Post, event: Post) => {
    const eventTime = new Date(event.eventStartTime!);
    const closestEventTime = new Date(closestEvent.eventStartTime!);
    if (eventTime < closestEventTime && eventTime > currentDate) {
      return event;
    } else {
      return closestEvent;
    }
  }, posts.docs[0]!);

  return upcomingEvent;
}
