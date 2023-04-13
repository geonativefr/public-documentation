# Device Avatar

Things to know about uploading custom avatars on `/api/assigned-devices/your-assigned-device`.

## Self-Hosted image

You know the URL, just provide it.


```http
PUT /api/assigned-devices/123456
Content-Type: application/json

{
  "avatar": {
    "@type": "RemoteImage",
    "value": "https://example.org/kitten.jpg"
  }
}
```

⬇️

```json
{
  "@type": "AssignedDevice",
  "@id": "/api/assigned-devices/123456",
  "avatar": {
    "@type": "RemoteImage",
    "value": "https://example.org/kitten.jpg"
  }
}
```

### Uploaded base64 image

Otherwise, we can host your image. Send it as a base64 Data-URI. 
Our API will upload it on our CDN and return the corresponding URL.

⚠︎ Payloads > 500KB may be refused by our back-end.

```http
PUT /api/assigned-devices/123456
Content-Type: application/json

{
  "avatar": {
    "@type": "RemoteImage",
    "value": "data://image/jpeg;base64,..."
  }
}
```

⬇️ 

```json
{
  "@type": "AssignedDevice",
  "@id": "/api/assigned-devices/123456",
  "avatar": {
    "@type": "RemoteImage",
    "value": "https://geonative.ams3.cdn.digitaloceanspaces.com/avatars/assigned-devices/123456/avnng5s5h8z5cu5ok8ezfzoiezezn.jpg"
  }
}
```

### Clear image

To get back to a default picture, just explicitely send `null` inside the `avatar` property:

```http
PUT /api/assigned-devices/123456
Content-Type: application/json

{
  "avatar": null
}
```

⬇️ 

```json
{
  "@type": "AssignedDevice",
  "@id": "/api/assigned-devices/123456",
  "avatar": null
}
```
