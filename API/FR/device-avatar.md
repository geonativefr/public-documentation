# Avatars personnalisés

Pour uploader des avatars personnalisés sur `/api/assigned-devices/votre-balise`:

## Image hébergée par vos soins

Si vous avez l'URL de l'image, il suffit de la fournir de la manière suivante:


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

### Uploader une image

Dans le cas contraire, nous pouvons l'héberger sur notre CDN. Il suffit de l'envoyer en tant que Data-URI, encodé en base64.
Notre API s'occupera de l'uploader et de vous retourner l'URL correspondante.

⚠︎ Les payloads > 500Ko peuvent être refusés par notre back-end.

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

### Supprimer l'image personnalisée

Pour revenir à une image par défaut, il suffit d'envoyer `null` dans la propriété `avatar` :

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

Si l'image était hébergée sur notre CDN, elle sera automatiquement supprimée.
