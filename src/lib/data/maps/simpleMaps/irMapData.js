var simplemaps_countrymap_mapdata={
    main_settings: {
     //General settings
      width: "responsive", //'700' or 'responsive'
      background_color: "#FFFFFF",
      background_transparent: "yes",
      border_color: "#ffffff",
      
      //State defaults
      state_description: "State description",
      state_color: "#88A4BC",
      state_hover_color: "#3B729F",
      state_url: "",
      border_size: 1.5,
      all_states_inactive: "no",
      all_states_zoomable: "yes",
      
      //Location defaults
      location_description: "Location description",
      location_url: "",
      location_color: "#FF0067",
      location_opacity: 0.8,
      location_hover_opacity: 1,
      location_size: 25,
      location_type: "square",
      location_image_source: "frog.png",
      location_border_color: "#FFFFFF",
      location_border: 2,
      location_hover_border: 2.5,
      all_locations_inactive: "no",
      all_locations_hidden: "no",
      
      //Label defaults
      label_color: "#ffffff",
      label_hover_color: "#ffffff",
      label_size: 16,
      label_font: "Arial",
      label_display: "auto",
      label_scale: "yes",
      hide_labels: "no",
      hide_eastern_labels: "no",
     
      //Zoom settings
      zoom: "yes",
      manual_zoom: "yes",
      back_image: "no",
      initial_back: "no",
      initial_zoom: "-1",
      initial_zoom_solo: "no",
      region_opacity: 1,
      region_hover_opacity: 0.6,
      zoom_out_incrementally: "yes",
      zoom_percentage: 0.99,
      zoom_time: 0.5,
      
      //Popup settings
      popup_color: "white",
      popup_opacity: 0.9,
      popup_shadow: 1,
      popup_corners: 5,
      popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
      popup_nocss: "no",
      
      //Advanced settings
      div: "map",
      auto_load: "yes",
      url_new_tab: "no",
      images_directory: "default",
      fade_time: 0.1,
      link_text: "View Website",
      popups: "detect"
    },
    state_specific: {
      IECE: {
        name: "Clare",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IECN: {
        name: "Cavan",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IECO: {
        name: "Cork",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IECW: {
        name: "Carlow",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IED: {
        name: "Dublin",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEDL: {
        name: "Donegal",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEG: {
        name: "Galway",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEKE: {
        name: "Kildare",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEKK: {
        name: "Kilkenny",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEKY: {
        name: "Kerry",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IELD: {
        name: "Longford",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IELH: {
        name: "Louth",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IELK: {
        name: "Limerick",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IELM: {
        name: "Leitrim",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IELS: {
        name: "Laoighis",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEMH: {
        name: "Meath",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEMN: {
        name: "Monaghan",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEMO: {
        name: "Mayo",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEOY: {
        name: "Offaly",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IERN: {
        name: "Roscommon",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IESO: {
        name: "Sligo",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IETA: {
        name: "Tipperary",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEWD: {
        name: "Waterford",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEWH: {
        name: "Westmeath",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEWW: {
        name: "Wicklow",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      },
      IEWX: {
        name: "Wexford",
        description: "default",
        color: "default",
        hover_color: "default",
        url: "default"
      }
    },
    locations: {
      "0": {
        name: "Dublin",
        lat: "53.333056",
        lng: "-6.248889"
      }
    },
    labels: {
      IECE: {
        name: "Clare",
        parent_id: "IECE"
      },
      IECN: {
        name: "Cavan",
        parent_id: "IECN"
      },
      IECO: {
        name: "Cork",
        parent_id: "IECO"
      },
      IECW: {
        name: "Carlow",
        parent_id: "IECW"
      },
      IED: {
        name: "Dublin",
        parent_id: "IED"
      },
      IEDL: {
        name: "Donegal",
        parent_id: "IEDL"
      },
      IEG: {
        name: "Galway",
        parent_id: "IEG"
      },
      IEKE: {
        name: "Kildare",
        parent_id: "IEKE"
      },
      IEKK: {
        name: "Kilkenny",
        parent_id: "IEKK"
      },
      IEKY: {
        name: "Kerry",
        parent_id: "IEKY"
      },
      IELD: {
        name: "Longford",
        parent_id: "IELD"
      },
      IELH: {
        name: "Louth",
        parent_id: "IELH"
      },
      IELK: {
        name: "Limerick",
        parent_id: "IELK"
      },
      IELM: {
        name: "Leitrim",
        parent_id: "IELM"
      },
      IELS: {
        name: "Laoighis",
        parent_id: "IELS"
      },
      IEMH: {
        name: "Meath",
        parent_id: "IEMH"
      },
      IEMN: {
        name: "Monaghan",
        parent_id: "IEMN"
      },
      IEMO: {
        name: "Mayo",
        parent_id: "IEMO"
      },
      IEOY: {
        name: "Offaly",
        parent_id: "IEOY"
      },
      IERN: {
        name: "Roscommon",
        parent_id: "IERN"
      },
      IESO: {
        name: "Sligo",
        parent_id: "IESO"
      },
      IETA: {
        name: "Tipperary",
        parent_id: "IETA"
      },
      IEWD: {
        name: "Waterford",
        parent_id: "IEWD"
      },
      IEWH: {
        name: "Westmeath",
        parent_id: "IEWH"
      },
      IEWW: {
        name: "Wicklow",
        parent_id: "IEWW"
      },
      IEWX: {
        name: "Wexford",
        parent_id: "IEWX"
      }
    },
    legend: {
      entries: []
    },
    regions: {}
  };