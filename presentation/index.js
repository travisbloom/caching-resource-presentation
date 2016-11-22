// Import React
import React from 'react'

// Import Spectacle Core tags
import {
  CodePane,
  Deck,
  Fill,
  S,
  Heading,
  Image,
  Layout,
  Link,
  Appear,
  ListItem,
  List,
  Slide,
  Spectacle,
  Text,
} from 'spectacle'
import CodeSlide from 'spectacle-code-slide'

// Import image preloader util
import preloader from 'spectacle/lib/utils/preloader'

// Import theme
import createTheme from 'spectacle/lib/themes/default'

// Require CSS
require('normalize.css')
require('spectacle/lib/themes/default/index.css')


const images = {
    spinner: require('../assets/spinner.gif'),
    djangoRest: require('../assets/djangorest.png'),
    individualResourceREST: require('../assets/individualResourceREST.jpg'),
    mindBlown: require('../assets/mindBlown.gif'),
    sad: require('../assets/sad.gif'),
    city: require('../assets/city.jpg'),
    kat: require('../assets/kat.png'),
    logo: require('../assets/formidable-logo.svg'),
    markdown: require('../assets/markdown.png'),
}

preloader(images)

const theme = createTheme({
    primary: '#ED591A',
})

const TripCard = ({ children }) => (
    <Text bgColor="white" margin="10px 10px" padding="10px 0">{children}</Text>
)

const Presentation = () => (
    <Spectacle theme={theme}>
        <Deck transition={['zoom', 'slide']} transitionDuration={500}>
            <Slide align="center center" transition={['zoom']} bgColor="primary">
                <Heading size={1} fit caps textColor="black">
                    Caching Remote Resources
                </Heading>
                <Text fit caps lineHeight={3} textColor="tertiary">
                    Using Redux to Normalize and Cache Your API
                </Text>
                <Link href="https://twitter.com/travisbloom">
                    <Text>@travisbloom</Text>
                    <Text>Engineer at Rocketrip</Text>
                </Link>
            </Slide>
            <Slide
                bgColor="primary"
                align="center flex-start"
                transition={['slide']}
                notes={`
                    What do I mean "remote resources".
                    Trips Page at Rocketrip.
                    Go to Actual trip, we want to avoid this (spinner)
                `}
            >
                <Heading size={2} caps fit textColor="black">
                    Caching Resources
                </Heading>
                <Layout>
                    <Fill>
                        <Text textAlign="left">/Trips</Text>
                        <TripCard>Trip to Atlanta</TripCard>
                        <TripCard>Trip to New York</TripCard>
                        <TripCard>Trip to San Francisco</TripCard>
                        <TripCard>Trip to London</TripCard>
                    </Fill>
                    <Fill>
                        <Text textAlign="left">/Trips/TripToAtlanta</Text>
                        <Appear>
                            <Image width="30%" src={images.spinner} />
                        </Appear>
                    </Fill>
                </Layout>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                    Simple stategy.
                    Can be backend (redis) or frontend.
                    Invalidation.
                    Cache per resource.
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Cache By URL
                </Heading>
                <Layout>
                    <Fill>
                        <CodePane
                            lang="jsx"
                            source={require('../assets/cacheByUrl.example')}
                            padding="20px auto"
                        />
                    </Fill>
                    <Fill>
                        <List textColor="white" margin="auto 20px">
                            <ListItem>{'Cache invalidation?'}</ListItem>
                            <ListItem>Resource-specific </ListItem>
                        </List>
                    </Fill>
                </Layout>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                    Rest focus on individual resources (generally align with backend models)
                    Lets expand on trips example.
                    We need Trip, but we also need employee, and org
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Resource-specific REST
                </Heading>
                <Layout>
                    <Fill>
                        <Image width="100%" src={images.individualResourceREST} />
                    </Fill>
                    <Fill>
                        <List textColor="white" margin="auto 20px">
                            <ListItem>/trips</ListItem>
                            <ListItem>/employees</ListItem>
                            <ListItem>/organizations</ListItem>
                        </List>
                    </Fill>
                </Layout>
            </Slide>
            <CodeSlide
                transition={['slide']}
                lang="jsx"
                code={require('../assets/getListOfTrips.example')}
                ranges={[
                    { loc: [0, 6], note: '/trips page requests are concurrent' },
                    { loc: [7, 8], note: 'Individual trip' },
                    { loc: [8, 15] },
                    { loc: [15, 25] },
                    { loc: [25, 31], note: '3 roundtrip requests to load a page' },
                ]}
            />
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="primary"
                bgImage={images.djangoRest.replace('/', '')}
                bgDarken={0.75}
            >
                <Heading size={4} textColor="white">
                    Avoiding Network Roundtrips With DRF Nested Serializers
                </Heading>
                <CodePane
                    lang="python"
                    source={`
                        class TripSerializer(serializers.ModelSerializer):
                            traveler_employee = EmployeeSerializer(read_only=True)

                        class EmployeeSerializer(serializers.ModelSerializer):
                            organization = OrganizationSerializer(read_only=True)
                    `}
                    padding="20px auto"
                />
                <Heading margin="30px 0 0 0" textColor="white" textAlign="left" textSize=".95em">
                    {'/trips/:id/?expand=traveler_employee,traveler_employee.organization'}
                </Heading>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Cache By <S type="strikethrough">URL</S> Resource
                </Heading>
                <List textColor="white" margin="auto 20px">
                    <ListItem textColor="primary">Normalizr</ListItem>
                    <ListItem>Redux</ListItem>
                    <ListItem>Selectors</ListItem>
                </List>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Normalizing Our API Responses
                </Heading>
                <Layout>
                    <Fill>
                        <CodePane
                            lang="javascript"
                            source={require('../assets/denormalizedAPIResponse.example')}
                            padding="20px auto"
                        />
                    </Fill>
                    <Fill>
                        <List margin="0 20px" textColor="white">
                            <ListItem>Return 2 of my trips</ListItem>
                            <ListItem>Update my name</ListItem>
                            <ListItem>{'????'}</ListItem>
                        </List>
                    </Fill>
                </Layout>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Normalizing Our API Responses
                </Heading>
                <Layout>
                    <Fill>
                        <Text textColor="primary">Convert This</Text>
                        <CodePane
                            lang="javascript"
                            source={require('../assets/expandedAPIResponse.example')}
                            padding="20px auto"
                        />
                    </Fill>
                    <Fill>
                        <Text textColor="primary">To This</Text>
                        <CodePane
                            lang="javascript"
                            source={`
const normalizedAPIResponse = {
    result: [194],
    entities: {
        trips: {
            194: {/* trip fields */}
        },
        employees: {
            318: {/* employee fields */}
        },
        organizations: {
            638: {/* organization fields */}
        }
    }
}
                            `}
                            padding="20px auto"
                        />
                    </Fill>
                </Layout>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Normalizing Our API Responses
                </Heading>
                <CodePane
                    lang="javascript"
                    source={require('../assets/normalizeTrip.example')}
                    padding="20px auto"
                />
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Cache By <S type="strikethrough">URL</S> Resource
                </Heading>
                <List textColor="white" margin="auto 20px">
                    <ListItem>Normalizr</ListItem>
                    <ListItem textColor="primary">Redux</ListItem>
                    <ListItem>Selectors</ListItem>
                </List>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Redux
                </Heading>
                <CodePane
                    lang="javascript"
                    source={require('../assets/reduxDocs.example')}
                    padding="20px auto"
                />
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Redux Resource State Shape
                </Heading>
                <Layout>
                    <Fill>
                        <CodePane
                            lang="javascript"
                            source={require('../assets/tripReducerStructure.example')}
                            padding="20px auto"
                        />
                    </Fill>
                    <Fill>
                        <CodePane
                            lang="javascript"
                            source={require('../assets/tripStateStructure.example')}
                            padding="20px auto"
                        />
                    </Fill>
                </Layout>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Cache By <S type="strikethrough">URL</S> Resource
                </Heading>
                <List textColor="white" margin="auto 20px">
                    <ListItem>Normalizr</ListItem>
                    <ListItem>Redux</ListItem>
                    <ListItem textColor="primary">Selectors</ListItem>
                </List>
            </Slide>
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                `}
            >
                <Heading size={4} caps textColor="primary">
                    Using Normalized Data
                </Heading>
                <CodePane
                    lang="javascript"
                    source={require('../assets/normalizedDataUIWoes.example')}
                    padding="20px auto"
                />
                <List textColor="white" margin="auto 20px">
                    <ListItem>
                        Brittle to changes in reducer state
                    </ListItem>
                    <ListItem>
                        Confusing to understand
                    </ListItem>
                </List>
            </Slide>
            <CodeSlide
                className="reselect-code"
                transition={['slide']}
                lang="jsx"
                fontSize=".5em"
                code={require('../assets/reselect.example')}
                ranges={[
                    { loc: [0, 13], note: 'move select logic out of mapStateToProps, denorm' },
                    { loc: [14, 15] },
                    { loc: [16, 20], notes: 'Define inputs to memoized function' },
                    { loc: [20, 30] },
                    { loc: [32, 41] },
                ]}
            />
            <Slide
                align="center flex-start"
                transition={['slide']}
                bgColor="black"
                notes={`
                    example of expand params we pass in. Be great to be able to specify these fields in the format they're returned. Interal aha moment
                `}
            >
                <Heading size={4} caps textColor="primary">
                    {'What\'s Next?'}
                </Heading>
                <Layout>
                    <Fill>
                        <CodePane
                            lang="javascript"
                            source={require('../assets/longExpandQuery.example')}
                            padding="20px auto"
                        />
                        <Appear>
                            <CodePane
                                lang="javascript"
                                source={require('../assets/longExpandGQL.example')}
                                padding="20px auto"
                            />
                        </Appear>
                    </Fill>
                    <Fill>
                        <Appear>
                            <Image width="80%" src={images.mindBlown} />
                        </Appear>
                    </Fill>
                </Layout>
            </Slide>
            <Slide>
                <Heading size={4} textColor="black">
                    GraphQL
                </Heading>
                <video autoPlay="true" loop="" playsInline="">
                    <source src="http://graphql.org/img/graphiql.mp4?x" type="video/mp4" />
                </video>
            </Slide>
            <Slide>
                <Heading size={4} textColor="black">
                    @travisbloom
                </Heading>
                <Heading size={4} textColor="black">
                    We're hiring!
                </Heading>
            </Slide>
        </Deck>
    </Spectacle>
)


export default Presentation
