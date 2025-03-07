# MyGeoNative API Documentation

This document details the API endpoints for the MyGeoNative IoT platform.

# Table of Contents

- [MyGeoNative API Documentation](#mygeonative-api-documentation)
    - [General Information](#general-information)
    - [Resources Details](#resources-details)
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
    - [User Registration and Identification](#user-registration-and-identification)
        - [Anonymous Registration (new user + new account)](#anonymous-registration-new-user--new-account)
        - [Adding a User to an Account or an Account to a User](#adding-a-user-to-an-account-or-an-account-to-a-user)
        - [Login](#login)
    - [Mercure Connection](#mercure-connection)
        - [Usage Example](#usage-example)

## General Information

| Parameter | Value |
|--|--|
| Base URI | https://api.geonative.app |
| Entrypoint | [/api](https://api.geonative.app/api/docs?ui=re_doc#tag/Account) |
| Mercure Hub | https://api.geonative.app/.well-known/mercure |
| Authentication | JWT (Authorization / Cookie) |
| Refresh tokens | Yes |
| Date timezone | UTC |
| PATCH requests | Disabled |
| PUT requests | Partial PUT (non-transmitted properties are ignored) |
| CORS | Enabled |

## Resources Details

### Account
The account is where beacons, beacon groups, alerts, zones, etc. are attached.
An account can be used by multiple `User` users.
The relationship between an `Account` and a `User` is materialized under the `Membership` resource.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| name | Account name |

#### Access Examples
##### List
Lists the accounts that the current user has access to.
```http
GET /api/accounts
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/Account)

### User
The user is the means of identification to the API and the means of access to linked accounts. Just as an *Account* can be accessed from multiple `User`s, a `User` can access multiple `Account`s.
The relationship between a `User` and an `Account` is materialized under the `Membership` resource.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| email | Email address |
| fullName | User's full name |

#### Access Examples
##### List
Lists the users that the current user has access to.
```http
GET /api/users
Accept: application/ld+json
```
[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/User)

### Membership
A `Membership` materializes the relationship between an `Account` and a `User`.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| account | Account IRI |
| user | User IRI |
| roles | Roles associated with this user for this account |

#### Access Examples
##### List
Lists the memberships that the current user has access to.
```http
GET /api/memberships
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/Membership)

### DeviceModel

Defines the characteristics specific to a beacon model.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| name | Model name |
| capabilities | Features exposed on the model |
| roles | Roles associated with this user for this account |

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/DeviceModel)

### Device

Represents a physical beacon.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| model | `DeviceModel` IRI |
| serialNumber | Serial number |
| assignment | Current `AssignedDevice` assignment IRI |
| properties | Hardware properties (IMEI, ICCID, etc) |

#### Access Examples
##### List
Lists the `Device`s that the current user has access to.
```http
GET /api/devices
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/Device)

### AssignedDevice

Represents the relationship (current or past) between a `Device` and an `Account`.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| assignedAt | Assignment date |
| revokedAt | Revocation date |
| account | Account IRI |
| device | Device IRI |
| state | Beacon state (location, battery, etc) |
| current | Current assignment (true) / past (false) |

#### Access Examples
##### List
Lists the `Device`s that the current user has access to.
```http
GET /api/assigned-devices
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/AssignedDevice)

### DeviceEvent
Represents an event (state change) of the beacon.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| eventDate | Event date (reported by the beacon) |
| account | Account IRI |
| assignedDevice | `AssignedDevice` IRI |
| stateBefore | Beacon state before the event |
| stateChangeSet | Properties modified during the event |
| stateAfter | Beacon state after the event |

#### Access Examples
##### List
Lists the `DeviceEvent`s of a beacon:
```http
GET /api/device-events?assignedDevice=[iri]
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/DeviceEvent)

### AssignedDeviceGroup
Represents a group of beacons.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| name | Group name |
| account | Account IRI |
| assignedDevices | `AssignedDevice` IRIs |

#### Access Examples
##### List
Lists the groups:
```http
GET /api/assigned-device-groups
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/AssignedDeviceGroup)

### AlertPolicy
Represents an alert configuration (alert policy).

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| name | Group name |
| account | Account IRI |
| assignedDevices | `AssignedDevice` IRIs to which the alert applies |
| assignedDeviceGroups | `AssignedDeviceGroup` IRIs to which the alert applies |
| type | Alert type |
| level | Alert level |
| rule | Trigger rule |
| contextualRule | Contextual trigger rule |
| actions | Actions to trigger |
| autoResolvable | If the alert can resolve itself (on state change) |

#### Access Examples
##### List
Lists the alert policies:
```http
GET /api/alert-policies
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/AlertPolicy)

### AssignedDeviceTriggeredAlert
Represents an alert trigger.

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| account | Account IRI |
| alertPolicy | Alert policy IRI |
| assignedDevice | `AssignedDevice` IRI that triggered the alert |
| state | Beacon state at the time of the alert |
| status | Alert status (ongoing, cancelled, confirmed, resolved) |
| acknowledgement | Acknowledgement status (ongoing, acknowledged, postponed) |
| confirmedAt | Confirmation date |
| acknowledgedAt | Acknowledgement date |
| acknowledgedBy | User who acknowledged |

#### Access Examples
##### List
Lists the 5 recent alerts of a beacon:
```http
GET /api/assigned-device-triggered-alerts?assignedDevice=[iri]&pagination=1&itemsPerPage=5&order[id]=desc
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/AssignedDeviceTriggeredAlert)

### Zone
Represents a geographical zone

#### Main Properties
| Property | Description |
|--|--|
| id | [ULID](https://github.com/ulid/spec#universally-unique-lexicographically-sortable-identifier) of the resource |
| createdAt | Creation date |
| account | Account IRI |
| name | Zone name |
| area | GEOJSON Multipolygon |
| center | Central point (if circular zone) |
| distance | Distance in meters (if circular zone) |

#### Access Examples
##### List
Lists the zones
```http
GET /api/zones
Accept: application/ld+json
```

[OpenAPI Documentation](https://api.geonative.app/api/docs?ui=re_doc#tag/AssignedDeviceTriggeredAlert)

## User Registration and Identification

### Anonymous Registration (new user + new account)

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

### Adding a User to an Account or an Account to a User
See [Membership](#membership).

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

The API will return a `User`.
You will find in the response headers the cookies `jwt_hp` which corresponds to the token and `refreshToken`.
The `token` corresponds to a time-limited JWT that can be exchanged for a valid (single-use) `refreshToken`.
The `token` is also provided in the response headers in the cookies `jwt_hp` (containing header + payload) and `jwt_s` (containing the signature). For better security, it is recommended not to manipulate tokens client-side and to rely [only on cookies](https://curity.io/resources/learn/split-token-pattern/).

#### Who am I

```http
GET /api/auth/login
Accept: application/ld+json
```

Returns a `User` type resource.

#### Request new token

```http
POST /api/auth/refresh
Content-type: application/json
Accept: application/json

{"refreshToken": "5g6e1g6z5f1z6f1z681r6e1v3z1f68zg4tr8bvjezbicyzevcizb"}
```

Returns a JSON with a new `refreshToken`.
If you use cookies, the payload is not mandatory: the `refreshToken` known in your cookies will be transmitted automatically.

#### Password Reset

##### Request
```http
POST /api/auth/reset
Content-type: application/json
Accept: application/json

{"email": "me@example.com"}
```

The user will receive an email containing a reset link.

##### Execution
```http
POST /api/auth/update-password
Content-type: application/json
Accept: application/json

{"email": "me@example.com", "token": "tokenFromEmail", "password": "myNewSecuredPassword"}
```

## Mercure Connection
Mercure is a PUB/SUB mechanism allowing to receive resource updates in real-time through an HTTP channel. Your HTTP client (browser or your programming language library) must support SSE (Server-Sent Events).

### Usage Example
Listening to all channels. Only updates allowed by your JWT will actually be received.
```http
GET /.well-known/mercure?topic=*
Authorization: Bearer [jwt]
```
*Note: Cookie authentication also works here.*

The server should return a `text/event-stream` type response, and the TCP connection should remain open:
```http
HTTP/2 OK
Content-type: text/event-stream
Connection: keep-alive
```
The response body will be fed progressively with resource updates in `JSON-LD` format.