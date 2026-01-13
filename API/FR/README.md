# Documentation API MyGeoNative

Ce document détaille les points d'entrée API à la plate-forme IoT MyGeoNative.

# Table des matières

- [Documentation API MyGeoNative](#documentation-api-mygeonative)
    - [Informations générales](#informations-générales)
    - [Supports de documentation](#supports-de-documentation)
    - [Détail des ressources](#détail-des-ressources)
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
        - [AssignedDeviceTriggeredAction](#assigneddevicetriggeredaction)
        - [Zone](#zone)
        - [AssignedDeviceZone](#assigneddevicezone)
        - [Tag](#tag)
        - [AssignedTag](#assignedtag)
        - [AssignedDeviceVehicleData](#assigneddevicevehicledata)
        - [VehicleData](#vehicledata)
        - [RideSection](#ridesection)
        - [AssignedDeviceGrant](#assigneddevicegrant)
        - [AssignedDeviceUser](#assigneddeviceuser)
        - [TemporaryAssignedDeviceAccess](#temporaryassigneddeviceaccess)
        - [AssignedDeviceMode](#assigneddevicemode)
        - [Report](#report)
        - [App](#app)
        - [AccountApp](#accountapp)
        - [PushSubscription](#pushsubscription)
        - [PrivateModeSession](#privatemodesession)
        - [AuthenticationLog](#authenticationlog)
    - [Enregistrement et identification utilisateur](#enregistrement-et-identification-utilisateur)
        - [Enregistrement anonyme (nouvel utilisateur + nouveau compte)](#enregistrement-anonyme-nouvel-utilisateur--nouveau-compte)
        - [Ajout d'un utilisateur à un compte ou un compte à un utilisateur](#ajout-dun-utilisateur-à-un-compte-ou-un-compte-à-un-utilisateur)
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
| Documentation JSON | [OpenAPI](../openapi/openapi.json)                                     |

## Supports de documentation

 - [Documentation OpenAPI (JSON)](../openapi.json) 
 - [Documentation OpenAPI (YAML)](../openapi.yaml)


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
| status | Statut du compte |
| accountApp | IRI de l'`AccountApp` (configuration d'application personnalisée) |
| daysToPruneDeviceEvents | Nombre de jours avant suppression automatique des événements |
| lastAccessAt | Date du dernier accès au compte |
| assignedDeviceVisibilityPolicy | Politique de visibilité des balises |
| preferences | Préférences du compte |

#### Exemples d'accès
##### Liste
Liste les comptes auxquels l'utilisateur courant a accès.
```http
GET /api/accounts
Accept: application/ld+json
```

##### Nouveaux endpoints
```http
POST /api/accounts/{account}/update-last-access-at
GET /api/accounts/{account}/last-triggered-alerts-by-alert-policies
GET /api/accounts/{account}/last-triggered-alerts-by-assigned-devices
```

### User
L'utilisateur est le moyen d'identification à l'API et le moyen d'accès aux comptes liés. De la même manière qu'un `Account` peut être accédé depuis plusieurs `User`, un `User` peut accéder à plusieurs `Account`.
La relation entre un `User` et un `Account` est matérialisée sous la ressource `Membership`.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| email | Adresse e-mail |
| fullName | Nom complet de l'utilisateur |
| avatar | Avatar de l'utilisateur |
| features | Fonctionnalités activées pour l'utilisateur |
| lastLoginAt | Date de la dernière connexion |
| preferences | Préférences de l'utilisateur |

#### Exemples d'accès
##### Liste
Liste les utilisateurs auxquels l'utilisateur courant a accès.
```http
GET /api/users
Accept: application/ld+json
```

###  Membership
Un `Membership` matérialise la relation entre un `Account` et un `User`.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| account | IRI du compte |
| user | IRI de l'utilisateur |
| roles | Rôles associés à cet utilisateur pour ce compte |
| assignedDeviceGrants | IRIs des `AssignedDeviceGrant` (permissions granulaires sur les balises) |
| preferences | Préférences du membership |

#### Exemples d'accès
##### Liste
Liste les memberships auxquels l'utilisateur courant a accès.
```http
GET /api/memberships
Accept: application/ld+json
```

### DeviceModel

Permet de définir les caractéristiques propres à un modèle de balise.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| name | Nom du modèle |
| capabilities | Fonctionnalités exposées sur le modèle |

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
| properties | Propriétés du matériel (IMEI, ICCID, etc) |
| systemConfiguration | Configuration système |
| status | Statut du device |

#### Exemples d'accès
##### Liste
Liste les `Device` auxquels l'utilisateur courant a accès.
```http
GET /api/devices
Accept: application/ld+json
```

### AssignedDevice

Représente la relation (actuelle ou passée) entre un `Device` et un `Account`.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| name | Nom de la balise assignée |
| assignedAt | Date d'assignation |
| revokedAt | Date de révocation |
| account | IRI du compte |
| device | IRI du device |
| groups | IRIs des `AssignedDeviceGroup` |
| state | État de la balise (localisation, batterie, etc) |
| stateUpdatedAt | Date de la dernière mise à jour d'état |
| current | Assignation courante (true) / passée (false) |
| status | Statut de l'assignation |
| configuration | Configuration de la balise |
| vehicleData | IRI de l'`AssignedDeviceVehicleData` (données véhicule) |
| grants | IRIs des `AssignedDeviceGrant` (permissions) |
| daysToPruneDeviceEvents | Nombre de jours avant suppression des événements |
| serialNumber | Numéro de série (depuis le device) |
| imei | IMEI (depuis le device) |
| avatar | Avatar de la balise |
| temporaryAssignedDeviceAccesses | IRIs des accès temporaires |
| capabilities | Capacités de la balise |
| preferences | Préférences de la balise |

#### Exemples d'accès
##### Liste
Liste les `AssignedDevice` auxquels l'utilisateur courant a accès.
```http
GET /api/assigned-devices
Accept: application/ld+json
```

##### Export
Exporte les balises assignées.
```http
GET /api/assigned-devices/export
Accept: application/ld+json
```

##### Mise à jour d'état
Met à jour directement l'état d'une balise.
```http
PUT /api/assigned-devices/{id}/update-state
Content-type: application/json
```

### DeviceEvent
Représente un événement (changement d'état) de la balise.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| eventDate | Date de l'événement (remonté par la balise) |
| account | IRI du compte |
| assignedDevice | IRI de l'`AssignedDevice` |
| stateBefore | État de la balise avant l'événement |
| stateChangeSet | Propriétés modifiées lors de l'événement |
| stateAfter | État de la balise après l'événement |

#### Exemples d'accès
##### Liste
Liste les `DeviceEvent` d'une balise:
```http
GET /api/device-events?assignedDevice=[iri]
Accept: application/ld+json
```

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
| options | Options du groupe |

#### Exemples d'accès
##### Liste
Liste les groupes:
```http
GET /api/assigned-device-groups
Accept: application/ld+json
```

### AlertPolicy
Représente une configuration d'alerte (police d'alerte).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| name | Nom de la police d'alerte |
| account | IRI du compte |
| assignedDevices | IRIs des `AssignedDevice` auxquels l'alerte s'applique |
| assignedDeviceGroups | IRIs des `AssignedDeviceGroup` auxquels l'alerte s'applique |
| type | Type d'alerte |
| level | Niveau d'alerte |
| rule | Règle de déclenchement |
| contextualRule | Règle contextuelle de déclenchement |
| confirmationRule | Règle de confirmation |
| weeklyScheduleTimes | Plages horaires hebdomadaires |
| actions | Actions à déclencher |
| active | Alerte active ou non |
| autoResolvable | Si l'alerte peut se résoudre seule (au changement d'état) |
| runsOnSchedule | Si l'alerte fonctionne selon un planning |
| preferences | Préférences de la police d'alerte |

#### Exemples d'accès
##### Liste
Liste les polices d'alerte:
```http
GET /api/alert-policies
Accept: application/ld+json
```

### AssignedDeviceTriggeredAlert
Représente un déclenchement d'alerte.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| account | IRI du compte |
| level | Niveau de l'alerte |
| alertPolicy | IRI de la police d'alerte |
| assignedDevice | IRI de l'`AssignedDevice` ayant déclenché l'alerte |
| state | État de la balise au moment de l'alerte |
| event | IRI de l'événement ayant déclenché l'alerte |
| eventDate | Date de l'événement |
| status | Statut de l'alerte (en cours, annulée, confirmée, résolue) |
| acknowledgement | Statut de l'acquittement (en cours, acquittée, reportée) |
| snoozedUntil | Date jusqu'à laquelle l'alerte est reportée |
| confirmedAt | Date de confirmation |
| acknowledgedAt | Date d'acquittement |
| acknowledgedBy | Utilisateur ayant acquitté |
| actions | Actions déclenchées |
| rule | Règle ayant déclenché l'alerte |
| context | Contexte de déclenchement |

#### Exemples d'accès
##### Liste
Liste les 5 alertes récentes d'une balise:
```http
GET /api/assigned-device-triggered-alerts?assignedDevice=[iri]&pagination=1&itemsPerPage=5&order[id]=desc
Accept: application/ld+json
```

##### Suppression par lot
Supprime plusieurs alertes en une seule requête:
```http
POST /api/assigned-device-triggered-alerts/batch-delete/account/{account}
Content-type: application/json
```

### AssignedDeviceTriggeredAction
Représente l'exécution d'une action déclenchée par une alerte (logs d'actions).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |

#### Exemples d'accès
##### Liste
Liste les actions déclenchées:
```http
GET /api/assigned-device-triggered-actions
Accept: application/ld+json
```

### Zone
Représente une zone géographique. Une zone peut être définie soit par un ou plusieurs polygones (MultiPolygon), soit par un point central et une distance (zone circulaire).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| account | IRI du compte |
| name | Nom de la zone |
| areas | MultiPolygone GeoJSON (pour zones polygonales) |
| center | Point central GeoJSON (pour zone circulaire) |
| distance | Distance en mètres depuis le centre (pour zone circulaire) |
| deviceModelProtocol | Protocole du modèle de device |
| preferences | Préférences de la zone |


#### Exemples d'accès
##### Liste
Liste les zones
```http
GET /api/zones
Accept: application/ld+json
```

### AssignedDeviceZone
Représente la relation entre une balise et une zone (historique de présence en zone).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| assignedDevice | IRI de l'`AssignedDevice` |
| zone | IRI de la `Zone` |

#### Exemples d'accès
##### Liste
Liste les relations balise-zone:
```http
GET /api/assigned-device-zones
Accept: application/ld+json
```

### Tag
Représente une balise BLE (Bluetooth Low Energy) / beacon physique.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| macAddress | Adresse MAC de la balise BLE |
| assignment | IRI de l'assignation courante `AssignedTag` |

#### Exemples d'accès
##### Liste
Liste les balises BLE:
```http
GET /api/tags
Accept: application/ld+json
```

### AssignedTag
Représente l'assignation d'une balise BLE à un compte.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| updatedAt | Date de dernière mise à jour |
| tag | IRI du `Tag` |
| account | IRI du compte |
| label | Libellé de la balise |
| description | Description de la balise |
| current | Assignation courante (true) / passée (false) |
| active | Balise active ou non |
| revokedAt | Date de révocation |

#### Exemples d'accès
##### Liste
Liste les balises BLE assignées:
```http
GET /api/assigned-tags
Accept: application/ld+json
```

### AssignedDeviceVehicleData
Représente les données véhicule associées à une balise (suivi de flotte, consommation, émissions).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| assignedDevice | IRI de l'`AssignedDevice` |
| odometerKms | Kilométrage de l'odomètre |
| odometerDate | Date du relevé d'odomètre |
| gpsCalculatedKms | Kilométrage calculé par GPS |
| gpsCalculatedKmsLastUpdateAt | Date de la dernière mise à jour du kilométrage GPS |
| vehicleType | Type de véhicule |
| vehicleEnergyType | Type d'énergie du véhicule |
| fuelConsumptionPer100Kms | Consommation de carburant pour 100 km |
| fuelConsumptionPerHour | Consommation de carburant par heure |
| co2EmissionsPer100Kms | Émissions CO2 pour 100 km |
| co2EmissionsPerHour | Émissions CO2 par heure |

#### Exemples d'accès
##### Liste
Liste les données véhicule:
```http
GET /api/assigned-device-vehicle-datas
Accept: application/ld+json
```

### VehicleData
Représente un modèle de données de consommation véhicule (template de consommation).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| fuelConsumptionPer100Kms | Consommation de carburant pour 100 km |
| fuelConsumptionPerHour | Consommation de carburant par heure |
| co2EmissionsPer100Kms | Émissions CO2 pour 100 km |
| co2EmissionsPerHour | Émissions CO2 par heure |

#### Exemples d'accès
##### Liste
Liste les modèles de données véhicule:
```http
GET /api/vehicle-datas
Accept: application/ld+json
```

### RideSection
Représente une section de trajet / déplacement avec statistiques (distance, vitesse, durée).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| assignedDevice | IRI de l'`AssignedDevice` |
| account | IRI du compte |
| startDate | Date de début du trajet |
| startIgnitionDate | Date de démarrage du contact |
| startMovingDate | Date de début de mouvement |
| endDate | Date de fin du trajet |
| endIgnitionDate | Date d'arrêt du contact |
| endMovingDate | Date de fin de mouvement |
| distance | Distance parcourue (en mètres) |
| maxSpeed | Vitesse maximale |
| averageSpeed | Vitesse moyenne |

#### Exemples d'accès
##### Liste
Liste les sections de trajet:
```http
GET /api/ride-sections
Accept: application/ld+json
```

### AssignedDeviceGrant
Représente une permission granulaire d'accès à une balise pour un membership spécifique.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| assignedDevice | IRI de l'`AssignedDevice` |
| membership | IRI du `Membership` |
| role | Rôle accordé |
| granted | Permission accordée (true/false) |

#### Exemples d'accès
##### Liste
Liste les permissions sur les balises:
```http
GET /api/assigned-device-grants
Accept: application/ld+json
```

### AssignedDeviceUser
Représente la relation explicite entre un utilisateur et une balise.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| assignedDevice | IRI de l'`AssignedDevice` |
| user | IRI de l'`User` |

#### Exemples d'accès
##### Liste
Liste les relations utilisateur-balise:
```http
GET /api/assigned-device-users
Accept: application/ld+json
```

### TemporaryAssignedDeviceAccess
Représente un accès temporaire à une balise avec une date d'expiration.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| assignedDevice | IRI de l'`AssignedDevice` |
| endDate | Date de fin de l'accès temporaire |
| createdBy | IRI de l'utilisateur ayant créé l'accès |

#### Exemples d'accès
##### Liste
Liste les accès temporaires:
```http
GET /api/temporary-assigned-device-accesses
Accept: application/ld+json
```

### AssignedDeviceMode
Représente l'historique des changements de mode d'une balise.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| assignedDevice | IRI de l'`AssignedDevice` |
| account | IRI du compte |
| fromState | État précédent |
| toState | Nouvel état |
| eventDate | Date de l'événement |

#### Exemples d'accès
##### Liste
Liste l'historique des modes:
```http
GET /api/assigned-device-modes
Accept: application/ld+json
```

### Report
Représente un rapport généré ou en cours de génération.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| account | IRI du compte |
| type | Type de rapport |
| fileType | Type de fichier (PDF, Excel, etc) |
| params | Paramètres du rapport |
| fromDate | Date de début de la période |
| toDate | Date de fin de la période |
| status | Statut du rapport (en attente, en cours, terminé, erreur) |
| details | Détails additionnels |
| enqueuedAt | Date de mise en file d'attente |
| startedAt | Date de début de génération |
| finishedAt | Date de fin de génération |
| expiresAt | Date d'expiration du rapport |

#### Exemples d'accès
##### Liste
Liste les rapports:
```http
GET /api/reports
Accept: application/ld+json
```

### App
Représente un modèle d'application pour la personnalisation (white-labeling).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| name | Nom de l'application |
| description | Description de l'application |
| template | Template de l'application |
| logos | Logos de l'application |
| loginBackgroundImage | Image de fond de la page de connexion |
| colors | Palette de couleurs personnalisée |
| avatars | Avatars disponibles |
| defaultAvatar | Avatar par défaut |
| defaultMapsProvider | Fournisseur de cartes par défaut |
| features | Fonctionnalités de l'application |

#### Exemples d'accès
##### Liste
Liste les applications:
```http
GET /api/apps
Accept: application/ld+json
```

### AccountApp
Représente la configuration d'application personnalisée pour un compte.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| account | IRI du compte |
| app | IRI de l'`App` |
| features | Fonctionnalités activées pour ce compte |
| resolvedFeatures | Fonctionnalités résolues (incluant celles héritées) |

#### Exemples d'accès
##### Liste
Liste les configurations d'application:
```http
GET /api/account-apps
Accept: application/ld+json
```

### PushSubscription
Représente un abonnement aux notifications push pour un utilisateur.

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| user | IRI de l'`User` |
| type | Type de push (FCM, APNS, etc) |
| hash | Hash unique de l'abonnement |
| name | Nom de l'appareil / abonnement |
| token | Token de l'abonnement |

#### Exemples d'accès
##### Liste
Liste les abonnements push:
```http
GET /api/push-subscriptions
Accept: application/ld+json
```

### PrivateModeSession
Représente une session de mode privé (désactivation temporaire du suivi).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| user | IRI de l'`User` |
| startDate | Date de début de la session |
| endDate | Date de fin de la session |

#### Exemples d'accès
##### Liste
Liste les sessions de mode privé:
```http
GET /api/private-mode-sessions
Accept: application/ld+json
```

### AuthenticationLog
Représente un log d'authentification (audit trail).

#### Principales propriétés
| Propriété | Description  |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) de la ressource |
| createdAt | Date de création |
| user | IRI de l'`User` |

#### Exemples d'accès
##### Liste
Liste les logs d'authentification:
```http
GET /api/authentication-logs
Accept: application/ld+json
```

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
  "password": "securedPassword"
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
Écoute de tous les canaux. Seules les mises à jour permises par votre JWT seront effectivement reçues.
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
