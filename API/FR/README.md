# Documentation API MyGeoNative

Ce document détaille les points d'entrée API à la plate-forme IoT MyGeoNative.

# Table des matières

- [Documentation API MyGeoNative](#documentation-api-mygeonative)
    - [Informations générales](#informations-gnrales)
    - [Détail des ressources](#dtail-des-ressources)
        - [Account](#account)
        - [User](#user)
        - [Membership](#membership)
        - [DeviceModel](#devicemodel)
        - [Device](#device)
        - [AssignedDevice](#assigneddevice)
        - [DeviceEvent](#deviceevent)
        - [AssignedDeviceGroup](#assigneddevicegroup)
        - [AlertPolicy](#alertpolicy)
        - [AssignedDeviceTriggeredAlert](#assigneddevicetriggeredalert)
        - [Zone](#zone)
    - [Enregistrement et identification utilisateur](#enregistrement-et-identification-utilisateur)
        - [Enregistrement anonyme (nouvel utilisateur + nouveau compte)](#enregistrement-anonyme-nouvel-utilisateur--nouveau-compte)
        - [Ajout d'un utilisateur à un compte ou un compte à un utilisateur](#ajout-dun-utilisateur--un-compte-ou-un-compte--un-utilisateur)
        - [Login](#login)
    - [Connexion Mercure](#connexion-mercure)
        - [Exemple d'usage](#exemple-dusage)

## Informations générales

| Paramètre | Valeur                                                        |
|--|---------------------------------------------------------------|
| Base URI | https://api.geonative.app                                     |
| Entrypoint | [/api](https://api.geonative.app/api/docs?ui=re_doc#tag/Account) |
| Hub Mercure | https://api.geonative.app/.well-known/mercure                 |
| Authentification | JWT (Authorization / Cookie)                                  |
| Refresh tokens | Oui                                                           |
| Fuseau horaire des dates | UTC                                                           |
| Requêtes PATCH | Désactivées                                                   |
| Requêtes PUT | PUT partiel (les propriétés non transmises sont ignorées)     
| CORS | Activé                                                        |


## Détail des ressources

### Account
C'est au compte que sont rattachés balises, groupes de balises, alertes, zones, etc.
Un compte peut être utilisé par plusieurs utilisateurs `User`.
La relation entre un `Account` et un `User` est matérialisée sous la ressource `Membership`.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| name | Nom du compte |

#### Examples d'accès
##### Liste
Liste les comptes auquel l'utilisateur courant a accès.
```http
GET /api/accounts
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/Account)

### User
L'utilisateur est le moyen d'identification à l'API et le moyen d'accès aux comptes liés. De la même manière qu'un *Account* peut être accédé depuis plusieurs `User`, un `User` peut accéder à plusieurs `Account`.
La relation entre un `User` et un `Account` est matérialisée sous la ressource `Membership`.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| email | Adresse e-mail |
| fullName | Nom complet de l'utilisateur |

#### Examples d'accès
##### Liste
Liste les utilisateurs auxquels l'utilisateur courant a accès.
```http
GET /api/users
Accept: application/ld+json
```
[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/User)

###  Membership
Un `Membership` matérialise la relation entre un `Account` et un `User`.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| account | IRI du compte |
| user | IRI de l'utilisateur |
| roles | Roles associés à cet utilisateur pour ce compte |

#### Examples d'accès
##### Liste
Liste les memberships auxquels l'utilisateur courant a accès.
```http
GET /api/memberships
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/Membership)

### DeviceModel

Permet de définir les caractéristiques propres à un modèle de balise.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| name | Nom du modèle |
| capabilities | Fonctionnalités exposées sur le modèle |
| roles | Roles associés à cet utilisateur pour ce compte |

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/DeviceModel)

### Device

Représente une balise physique.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| model | IRI du `DeviceModel` |
| serialNumber | Numéro de série |
| assignment | IRI de l'assignation courante `AssignedDevice` |
| properties | Propriétés du matériel (IMEI, ICCID, etc)

#### Examples d'accès
##### Liste
Liste les `Device` auxquels l'utilisateur courant a accès.
```http
GET /api/devices
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/Device)

### AssignedDevice

Représente la relation (actuelle ou passée) entre un `Device` et un `Account`.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| assignedAt | Date d'assignation |
| revokedAt | Date de révocation |
| account | IRI du compte |
| device | IRI du device |
| state | Etat de la balise (localisation, batterie, etc) |
| current | Assignation courante (true) / passée (false)

#### Examples d'accès
##### Liste
Liste les `Device` auxquels l'utilisateur courant a accès.
```http
GET /api/assigned-devices
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/AssignedDevice)

[Upload d'avatars personnalisés](./device-avatar.md)

### DeviceEvent
Représente un évènement (changement d'état) de la balise.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| eventDate | Date de l'évènement (remonté par la balise) |
| account | IRI du compte |
| assignedDevice | IRI de l'`AssignedDevice` |
| stateBefore | Etat de la balise avant l'évènement |
| stateChangeSet | Propriétés modifiées lors de l'évènement |
| stateAfter | Etat de la balise après l'évènement |

#### Examples d'accès
##### Liste
Liste les `DeviceEvent` d'une balise:
```http
GET /api/device-events?assignedDevice=[iri]
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/DeviceEvent)


### AssignedDeviceGroup
Représente un groupe de balises.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| name | Nom du groupe |
| account | IRI du compte |
| assignedDevices | IRIs des `AssignedDevice` |

#### Examples d'accès
##### Liste
Liste les groupes:
```http
GET /api/assigned-device-groups
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/AssignedDeviceGroup)


### AlertPolicy
Représente une configuration d'alerte (police d'alerte).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| name | Nom du groupe |
| account | IRI du compte |
| assignedDevices | IRIs des `AssignedDevice` auxquels l'alerte s'applique |
| assignedDeviceGroups | IRIs des `AssignedDeviceGroup` auxquels l'alerte s'applique |
| type | Type d'alerte |
| level | Niveau d'alerte |
| rule | Règle de déclenchement |
| contextualRule | Règle contextuelle de déclenchement |
| actions | Actions à déclencher |
| autoResolvable | Si l'alerte peut se résoudre seule (au changement d'état) |

#### Examples d'accès
##### Liste
Liste les polices d'alerte:
```http
GET /api/alert-policies
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/AlertPolicy)

### AssignedDeviceTriggeredAlert
Représente un déclenchement d'alerte.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| account | IRI du compte |
| alertPolicy | IRI de la police d'alerte |
| assignedDevice | IRI de l'`AssignedDevice` ayant déclenché l'alerte |
| state | Etat de la balise au moment de l'alerte |
| status | Statut de l'alerte (en cours, annulée, confirmée, résolue) |
| acknowledgement | Statut de l'acquittement (en cours, acquittée, reportée) |
| confirmedAt | Date de confirmation |
| acknowledgedAt | Date d'acquittement |
| acknowledgedBy | Utilisateur ayant acquitté |

#### Examples d'accès
##### Liste
Liste les 5 alertes récentes d'une balise:
```http
GET /api/assigned-device-triggered-alerts?assignedDevice=[iri]&pagination=1&itemsPerPage=5&order[id]=desc
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/AssignedDeviceTriggeredAlert)

### Zone
Représente une zone géographique

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| account | IRI du compte |
| name | Nom de la zone |
| area | Multipolygone GEOJSON |
| center | Point centrale (si zone circulaire) |
| distance | Distance en mètres (si zone circulaire) |


#### Examples d'accès
##### Liste
Liste les zones
```http
GET /api/zones
Accept: application/ld+json
```

[Documentation OpenAPI](https://api.geonative.app/api/docs?ui=re_doc#tag/AssignedDeviceTriggeredAlert)

## Enregistrement et identification utilisateur

### Enregistrement anonyme (nouvel utilisateur + nouveau compte)

```http
POST /api/auth/register
Content-type: application/json
Accept: application/ld+json

{
  "user": {
    "email": "me@example.com",
    "fullName": "John Doe",
    "password": "securedPassword"
  },
  "account": {
    "name": "ACME CORP, Inc."
  }
}
```

### Ajout d'un utilisateur à un compte ou un compte à un utilisateur
Cf [Membership](#membership).

### Login

#### Identification
```http
POST /api/auth/login
Content-type: application/json
Accept: application/ld+json

{
  "username": "me@example.com",
  "password": "securedPassword",
}
```

L'API retournera une ressource de type `User` avec les propriétés additionnelles `token` et `refreshToken`.
Le `token` correspond à un JWT à durée limitée qui pourra être échangé contre un `refreshToken` valide (à usage unique).
Le `token` est également fourni dans les headers de réponse dans les cookies `jwt_hp` (contenant header + payload) et `jwt_s` (contenant la signature). Pour plus de sécurité, il est recommandé de ne pas manipuler les tokens côté client et de s'en remettre [uniquement aux cookies](https://curity.io/resources/learn/split-token-pattern/).

#### Qui suis-je

```http
GET /api/auth/login
Accept: application/ld+json
```

Retourne une ressource de type `User`.

#### Demande de nouveau token

```http
POST /api/auth/refresh
Content-type: application/json
Accept: application/json

{"refreshToken": "5g6e1g6z5f1z6f1z681r6e1v3z1f68zg4tr8bvjezbicyzevcizb"}
```

Retourne un JSON avec un nouveau `refreshToken`.
Si vous utilisez les cookies, le payload n'est pas obligatoire: le `refreshToken` connu dans vos cookies sera transmis automatiquement.

#### Réinitialisation de mot de passe

##### Demande
```http
POST /api/auth/reset
Content-type: application/json
Accept: application/json

{"email": "me@example.com"}
```

L'utilisateur recevra un e-mail contenant un lien pour la réinitialisation.

##### Exécution
```http
POST /api/auth/update-password
Content-type: application/json
Accept: application/json

{"email": "me@example.com", "token": "tokenFromEmail", "password": "myNewSecuredPassword"}
```

## Connexion Mercure
Mercure est un mécanisme PUB/SUB permettant de recevoir les mises à jour des ressources en direct dans un canal HTTP. Votre client HTTP (navigateur ou librairie de votre langage de programmation) doit supporter les SSE (Server-Sent Events).

### Exemple d'usage
Ecoute de tous les canaux. Seules les mises à jour permises par votre JWT seront effectivement reçues.
```http
GET /.well-known/mercure?topic=*
Authorization: Bearer [jwt]
```
*NB: L'authentification par cookie fonctionne également ici.*

Le serveur devrait retourner une réponse de type `text/event-stream`, et la connexion TCP devrait rester ouverte:
```http
HTTP/2 OK
Content-type: text/event-stream
Connection: keep-alive
```
Le corps de réponse sera alimenté au fur et à mesure par les mises à jour de ressources, au format `JSON-LD`.
