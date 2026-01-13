## Documentation API MyGeoNative

Documentation officielle de l'API de la plateforme IoT MyGeoNative.

### Documentation utilisateur

- 📖 **[Documentation API](./API/FR/README.md)**
- 📖 **[Documentation Swagger](./API/openapi/openapi.html)**

Cette documentation détaille l'ensemble des ressources disponibles.

### OpenAPI

La spécification OpenAPI complète est disponible dans deux formats :

- [**Documenation JSON**](./API/openapi/openapi.json)
- [**Documenation YAML**](./API/openapi/openapi.yaml)

Ces fichiers peuvent être utilisés avec des outils comme Swagger UI, Postman, ou tout autre client compatible OpenAPI.

## Caractéristiques de l'API

| Caractéristique | Détails |
|-----------------|---------|
| **Format** | JSON-LD (API Platform) |
| **Authentification** | JWT via Authorization header ou cookies |
| **Base URL** | https://api.geonative.app |
| **Entrypoint** | /api |
| **Identifiants** | ULID (Universally Unique Lexicographically Sortable Identifier) |
| **Timezone** | UTC |
| **CORS** | Activé |
| **Temps réel** | Mercure Hub (Server-Sent Events) |

## Démarrage rapide

### Authentification

```http
POST https://api.geonative.app/api/auth/login
Content-Type: application/json

{
  "username": "votre@email.com",
  "password": "votreMotDePasse"
}
```

### Récupérer vos comptes

```http
GET https://api.geonative.app/api/accounts
Accept: application/ld+json
Authorization: Bearer VOTRE_JWT_TOKEN
```

### Lister vos balises

```http
GET https://api.geonative.app/api/assigned-devices
Accept: application/ld+json
Authorization: Bearer VOTRE_JWT_TOKEN
```

## Mises à jour en temps réel (Mercure)

L'API supporte les mises à jour en temps réel via Mercure (SSE - Server-Sent Events) :

```http
GET https://api.geonative.app/.well-known/mercure?topic=*
Authorization: Bearer VOTRE_JWT_TOKEN
```

### Topics disponibles

Les topics Mercure correspondent aux IRIs des ressources. Vous pouvez vous abonner à des ressources spécifiques ou utiliser `*` pour recevoir toutes les mises à jour autorisées.

**Ressources supportant les mises à jour temps réel :**

- `assigned-devices` - Mises à jour des balises assignées
- `assigned-device-triggered-alerts` - Déclenchements d'alertes
- `assigned-device-triggered-actions` - Exécution d'actions
- `assigned-device-groups` - Groupes de balises
- `accounts` - Comptes
- `users` - Utilisateurs
- `memberships` - Relations utilisateur-compte
- `alert-policies` - Polices d'alerte
- `zones` - Zones géographiques
- `reports` - Génération de rapports
- `push-subscriptions` - Abonnements push
- `private-mode-sessions` - Sessions mode privé

**Exemples d'abonnement :**

```http
# Toutes les mises à jour autorisées
GET https://api.geonative.app/.well-known/mercure?topic=*

# Les Balises de votre compte
GET https://api.geonative.app/.well-known/mercure?topic=/api/assigned-devices

# Balise spécifique
GET https://api.geonative.app/.well-known/mercure?topic=/api/assigned-devices/{id}
```

Les mises à jour des ressources sont envoyées automatiquement au format JSON-LD.

## Licence

© 2025 GeoNative. Tous droits réservés.
