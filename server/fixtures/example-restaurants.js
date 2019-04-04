const restaurants = [
  {
    id: 'YBmk31pBPukmnRyioe5uBA',
    name: 'Sushi Gen',
    url:
      'https://www.yelp.com/biz/sushi-gen-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media4.fl.yelpcdn.com/bphoto/tBsq9To8OQjF3mz1zLMX6A/o.jpg',
    rating: 4.5,
    location: '422 E 2nd StLos Angeles, CA 90012',
    coords: [-118.238502456345, 34.0470000646326],
    phone: '+12136170552',
  },
  {
    id: 'Wg2VeeGsAcOEa_0qI1vgQw',
    name: 'Sushi by H',
    url:
      'https://www.yelp.com/biz/sushi-by-h-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/iwtGqNgo-HAhcjFOVnGV1w/o.jpg',
    rating: 4.5,
    location: '480 S San Vicente BlvdLos Angeles, CA 90048',
    coords: [-118.374727046627, 34.0693585562276],
    phone: '+13237820547',
  },
  {
    id: '_hljp2lAVTCaTMGxORvybA',
    name: 'Sushi One',
    url:
      'https://www.yelp.com/biz/sushi-one-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media1.fl.yelpcdn.com/bphoto/fkcV6Bc8EHjSR1FUgOHPZg/o.jpg',
    rating: 4,
    location: '3905 W 6th StLos Angeles, CA 90020',
    coords: [-118.3082425, 34.0636449],
    phone: '+12139085082',
  },
  {
    id: 'us0WnDOySVXXXwCqs0AaCw',
    name: 'いざかや おせん- IZAKAYA OSEN',
    url:
      'https://www.yelp.com/biz/%E3%81%84%E3%81%96%E3%81%8B%E3%82%84-%E3%81%8A%E3%81%9B%E3%82%93-izakaya-osen-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media1.fl.yelpcdn.com/bphoto/gdLFWvH_0VePgcaHSPqMPg/o.jpg',
    rating: 4.5,
    location: '2903 Sunset BlvdLos Angeles, CA 90029',
    coords: [-118.2735256, 34.0833191],
    phone: '+13239282220',
  },
  {
    id: 'Ls0cIqY-v6CqNoE2rHjBNg',
    name: 'Noshi Sushi',
    url:
      'https://www.yelp.com/biz/noshi-sushi-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/ZLCsfe2C2U3R3Vt41e2pSg/o.jpg',
    rating: 4,
    location: '4430 Beverly BlvdLos Angeles, CA 90004',
    coords: [-118.305407725275, 34.0761600290924],
    phone: '+13234693458',
  },
  {
    id: 'ciZAxEwbFBafvf2UGUxySw',
    name: 'Tsuri',
    url:
      'https://www.yelp.com/biz/tsuri-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media4.fl.yelpcdn.com/bphoto/yLk-30n41bh75XM0mCWylQ/o.jpg',
    rating: 4,
    location: '7015 Melrose AveLos Angeles, CA 90038',
    coords: [-118.34331, 34.08366],
    phone: '+13239351517',
  },
  {
    id: 'tJsZbLxMiykQCek_-diOvg',
    name: 'Sushi Enya',
    url:
      'https://www.yelp.com/biz/sushi-enya-los-angeles-4?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/1-9d0s4-ArNNHbY2_9TtmA/o.jpg',
    rating: 4.5,
    location: '343 E 1st StLos Angeles, CA 90012',
    coords: [-118.23963, 34.04984],
    phone: '',
  },
  {
    id: 'hC745S5W4HTq606ySmBJNw',
    name: 'KazuNori  | The Original Hand Roll Bar',
    url:
      'https://www.yelp.com/biz/kazunori-the-original-hand-roll-bar-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media3.fl.yelpcdn.com/bphoto/9D63gCmIesyBQO15NNG9Xw/o.jpg',
    rating: 4.5,
    location: '421 S Main StLos Angeles, CA 90013',
    coords: [-118.247747561303, 34.0476390576719],
    phone: '+12134936956',
  },
  {
    id: '6KWWh5MEe0WePoUOd2sxxQ',
    name: 'Sushi Ippo',
    url:
      'https://www.yelp.com/biz/sushi-ippo-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media1.fl.yelpcdn.com/bphoto/clzHy0CQBPSLOHoTjltbdQ/o.jpg',
    rating: 4,
    location: '3800 Wilshire BlvdLos Angeles, CA 90010',
    coords: [-118.309408, 34.061407],
    phone: '+12133810110',
  },
  {
    id: 'NGdii-6GhGFUwD6HXEeGtg',
    name: 'Murakami Sushi',
    url:
      'https://www.yelp.com/biz/murakami-sushi-los-angeles-2?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media4.fl.yelpcdn.com/bphoto/ENZPA_I2CaJBxyRICxWCvg/o.jpg',
    rating: 4.5,
    location: '7160 Melrose AveLos Angeles, CA 90046',
    coords: [-118.345596268773, 34.0833787161873],
    phone: '+13236921450',
  },
  {
    id: 'JMJWvgBKUO6_wOPtnTCPgQ',
    name: 'Hama Sushi',
    url:
      'https://www.yelp.com/biz/hama-sushi-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media4.fl.yelpcdn.com/bphoto/gnecSqJHE7CTTukSWAFnHQ/o.jpg',
    rating: 4,
    location: '347 E 2nd StLos Angeles, CA 90012',
    coords: [-118.24039619933, 34.0484545930015],
    phone: '+12136803454',
  },
  {
    id: 'iDKPhqnZGbI5OqZxnj3ooA',
    name: 'Sushi Ye',
    url:
      'https://www.yelp.com/biz/sushi-ye-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/anTzZlG7hadzJ6frNd-EeQ/o.jpg',
    rating: 4.5,
    location: '244 S Oxford AveSte 4Los Angeles, CA 90004',
    coords: [-118.3078831, 34.0697186],
    phone: '+12133888283',
  },
  {
    id: 'YCEgBqClpWXQ3leoAhWjoA',
    name: 'Sushi Hon',
    url:
      'https://www.yelp.com/biz/sushi-hon-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media4.fl.yelpcdn.com/bphoto/aDJPXz0Ht8pfYCbjP11y6w/o.jpg',
    rating: 4.5,
    location: '3929 W Olympic BlvdLos Angeles, CA 90019',
    coords: [-118.320434, 34.0538778],
    phone: '+13238523030',
  },
  {
    id: 'rupB_SZL6dEh3zi8ZnxM2w',
    name: 'Kanpai Japanese Sushi Bar & Grill 2',
    url:
      'https://www.yelp.com/biz/kanpai-japanese-sushi-bar-and-grill-2-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/j-JhxjAvT3uFmA09_e8bow/o.jpg',
    rating: 4,
    location: '8736 S Sepulveda BlvdSte CLos Angeles, CA 90045',
    coords: [-118.395974141022, 33.957713033813],
    phone: '+13106700533',
  },
  {
    id: 'py2dW-WLfw8RfT4lkYX6pA',
    name: 'Hamasaku',
    url:
      'https://www.yelp.com/biz/hamasaku-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media1.fl.yelpcdn.com/bphoto/iZThWBbONsX_ppo2qnGWSw/o.jpg',
    rating: 4,
    location: '11043 Santa Monica BlvdLos Angeles, CA 90025',
    coords: [-118.443351, 34.048303],
    phone: '+13104797636',
  },
  {
    id: 'YpM5qRwt8uwC77WNZtGIfA',
    name: 'Muraya',
    url:
      'https://www.yelp.com/biz/muraya-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/6zCYcWGX-4xPkzrZxwWbxw/o.jpg',
    rating: 4.5,
    location: '125 N Larchmont BlvdLos Angeles, CA 90004',
    coords: [-118.3237649, 34.0736322],
    phone: '+13238560369',
  },
  {
    id: 'gHjqZaWcMjkvloNjACqLAg',
    name: 'Sushi Zo',
    url:
      'https://www.yelp.com/biz/sushi-zo-los-angeles-10?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media2.fl.yelpcdn.com/bphoto/c8bnXUoiuMkdDi7_b6-3DA/o.jpg',
    rating: 4.5,
    location: '334 S Main StSte 1106Los Angeles, CA 90013',
    coords: [-118.246926750659, 34.0480956293316],
    phone: '+14242015576',
  },
  {
    id: 'jaSU9mfMdZ5ejcbk_lMvSw',
    name: 'Hide Sushi Japanese Restaurant',
    url:
      'https://www.yelp.com/biz/hide-sushi-japanese-restaurant-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media3.fl.yelpcdn.com/bphoto/TeaZI9dz-OJKsqAe7Ez4iA/o.jpg',
    rating: 4,
    location: '2040 Sawtelle BlvdLos Angeles, CA 90025',
    coords: [-118.442672, 34.040285],
    phone: '+13104777242',
  },
  {
    id: 'XLsOnL8sxGCB0rr9zjCkbw',
    name: 'Kazoku Sushi',
    url:
      'https://www.yelp.com/biz/kazoku-sushi-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media3.fl.yelpcdn.com/bphoto/t9D0vN7XLinsGllJd5uG8Q/o.jpg',
    rating: 4,
    location: '5259 Hollywood BlvdLos Angeles, CA 90027',
    coords: [-118.3056992, 34.1018379],
    phone: '+13238171002',
  },
  {
    id: 'kDMsnq59lJAjMX1baGJPEA',
    name: 'Kanpai Japanese Sushi Bar & Grill',
    url:
      'https://www.yelp.com/biz/kanpai-japanese-sushi-bar-and-grill-los-angeles?adjust_creative=45La0tMdMZGyGSogER-v3g&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=45La0tMdMZGyGSogER-v3g',
    image_url:
      'https://s3-media1.fl.yelpcdn.com/bphoto/1tyXqFN08lZNsRBor_GxUw/o.jpg',
    rating: 4,
    location: '8325 Lincoln BlvdLos Angeles, CA 90045',
    coords: [-118.4214, 33.96185],
    phone: '+13103387223',
  },
];

module.exports = restaurants;
