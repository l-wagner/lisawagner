import json
import time
import math
import sys
import xmltodict
import requests
from datetime import date

with open("config.json") as f:
    config = json.load(f)

API_KEY = config["GOODREADS_API_KEY"]
USER = config["GOODREADS_USER_ID"]


class book:
    def __init__(
        self, title, author, authorLink, year, imageUrl, link, ratingsAvg, ratingsNumber, rating=""
    ):
        self.title = title
        self.author = author
        self.authorLink = authorLink
        self.year = year
        self.imageUrl = imageUrl
        self.link = link
        self.ratingsAvg = ratingsAvg
        self.ratingsNumber = ratingsNumber
        self.rating = rating

    @property
    def serialize(self):
        "Return object data in easily serializable format"
        return {
            "title": self.title,
            "author": self.author,
            "authorLink": self.authorLink,
            "year": self.year,
            "imageUrl": self.imageUrl,
            "link": self.link,
            "ratingsAvg": self.ratingsAvg,
            "ratingsNumber": self.ratingsNumber,
            "rating": self.rating,
        }


r = requests.get(
    f"https://www.goodreads.com/review/list/{USER}.xml?key={API_KEY}&v=2&shelf=read&per_page=200&page=1"
)

if "Page not found" in r.text:
    print("Goodreads returned an error. Are you sure {USER} is a valid user id.")
    sys.exit()
if "Invalid API key" in r.text:
    print("It looks like your API Key is invalid.")
    sys.exit()

result = xmltodict.parse(r.text)
totalRead = int(result["GoodreadsResponse"]["reviews"]["@total"])
judgment = "Awesome job." if totalRead > 200 else "Good job."
print(f"Found {totalRead} read books. {judgment}")
finalPage = math.ceil(totalRead / 200) + 1
inflectedPage = "pages" if finalPage > 1 else "page"
print(f"Retrieving {finalPage} {inflectedPage} from Goodreads...")

results = []
for i in range(1, finalPage):
    url = f"https://www.goodreads.com/review/list/{USER}.xml?key={API_KEY}&v=2&shelf=read&per_page=200&page={i}"
    r = requests.get(url)
    results.append(xmltodict.parse(r.text))
    # goodreads allows only 1 request per second
    time.sleep(2)

books = []
count = 0
for result in results:
    count += 1
    print(count)
    if "review" in result["GoodreadsResponse"]["reviews"]:
        for review in result["GoodreadsResponse"]["reviews"]["review"]:
            title = review["book"]["title_without_series"]
            author = review["book"]["authors"]["author"]["name"]
            authorLink = review["book"]["authors"]["author"]["link"]
            year = review["book"]["publication_year"]
            imageUrl = review["book"]["image_url"]
            link = review["book"]["link"]
            ratingsAvg = review["book"]["average_rating"]
            ratingsNumber = review["book"]["ratings_count"]
            rating = ""
            if "rating" in review:
                rating = review["rating"]

            books.append(
                book(
                    title,
                    author,
                    authorLink,
                    year,
                    imageUrl,
                    link,
                    ratingsAvg,
                    ratingsNumber,
                    rating,
                )
            )

today = date.today()
filename = f"./books-{today}.json"
with open(filename, "w") as outfile:
    json.dump([ob.__dict__ for ob in books], outfile)
print(f"Done! {len(books)} books added to {filename}")
