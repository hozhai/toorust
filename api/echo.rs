use std::collections::HashMap;

use serde_json::json;
use url::Url;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let headers = _req.headers();
    let user_agent = match headers.get("user-agent") {
        Some(value) => value.to_str().unwrap(),
        None => "unknown",
    };

    let url = Url::parse(&_req.uri().to_string()).unwrap();

    let query_params = url
        .query_pairs()
        .into_owned()
        .collect::<HashMap<String, String>>();

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(
            json!({ 
              "path": url.path(), 
              "query": {
                "msg": query_params.get("msg")
              },
              "headers": {
              "userAgent": user_agent
            } })
            .to_string()
            .into(),
        )?)
}
