  /* ---------- Photos (real assets) ---------- */
  const PHOTOS = {
    warsaw:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790154701/Gemini_Generated_Image_y74x5ty74x5ty74x_fkza4k.jpg',
    krakow:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790154693/Gemini_Generated_Image_qit25cqit25cqit2_uozqxb.jpg',
    wroclaw: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790154694/Gemini_Generated_Image_6vff8i6vff8i6vff_a0d0yk.jpg',
    poznan:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790154707/Gemini_Generated_Image_i3jaxxi3jaxxi3ja_txtifg.jpg',
    gdansk:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790155032/Gemini_Generated_Image_q4n3q0q4n3q0q4n3_vtfuv1.jpg',
    gdynia:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790154696/Gemini_Generated_Image_1e8cas1e8cas1e8c_hikyxv.jpg',
    lodz:    'https://res.cloudinary.com/drugkfpwo/image/upload/v1790154704/Gemini_Generated_Image_d0f4dnd0f4dnd0f4_ipj4i4.jpg',
    steps:   'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153100/ChatGPT_Image_21_%D0%B2%D0%B5%D1%80._2026_%D1%80._09_11_53_bwkx3a.png',
    l1:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153203/4BC3E5AB-A30C-4C79-9DFA-35EB14933C26_dyd8xi.png',
    l2:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790154709/Gemini_Generated_Image_nvlnwlnvlnwlnvln_c133wb.jpg',
    l3:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153203/7E90C68A-D032-4440-95D0-8353A3B70218_eaw1b7.png',
    l4:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153210/91085419-AE09-4357-971F-CC73C39E7C37_cutj0z.png',
    l5:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153082/Gemini_Generated_Image_jbslbwjbslbwjbsl_ic1eob.jpg',
    l6:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153086/ChatGPT_Image_21_%D0%B2%D0%B5%D1%80._2026_%D1%80._09_42_06_equsla.png',
    l7:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153080/Gemini_Generated_Image_yuvoeyyuvoeyyuvo_wyptt2.jpg',
    l8:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153097/ChatGPT_Image_21_%D0%B2%D0%B5%D1%80._2026_%D1%80._09_36_27_iwyhql.png',
    l9:  'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153093/ChatGPT_Image_21_%D0%B2%D0%B5%D1%80._2026_%D1%80._09_37_57_yufbtp.png',
    l10: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153201/6057BBAE-C749-41AB-8911-742CBAE5D6C4_jzzelu.png',
    l11: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153212/AD06855D-D4E9-494E-80FE-8D098778A6AE_woeysl.png',
    l12: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153207/243D1125-7731-4409-8DC0-396519113030_zcrqg7.png',
    l13: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153097/Gemini_Generated_Image_ttjwlrttjwlrttjw_qqdakb.jpg',
    t1: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790154709/Gemini_Generated_Image_nvlnwlnvlnwlnvln_c133wb.jpg',
    t2: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153081/Gemini_Generated_Image_3ww7v93ww7v93ww7_thtoia.jpg',
    t3: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153098/ChatGPT_Image_21_%D0%B2%D0%B5%D1%80._2026_%D1%80._09_36_04_nothpb.png',
    about1: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153199/77128D5E-1592-4D1B-8606-31BF88A0B885_pp6xkn.png',
    contact1: 'https://res.cloudinary.com/drugkfpwo/image/upload/v1790153101/Gemini_Generated_Image_c49v4bc49v4bc49v_pmojmv.jpg'
  };
  const src = (val, w) => /^https?:\/\//.test(val)
    ? val
    : `https://images.unsplash.com/photo-${val}?auto=format&fit=crop&w=${w || 1200}&q=70`;
  function hydrateImages(root) {
    root.querySelectorAll('img[data-photo]').forEach(img => {
      img.addEventListener('error', () => img.classList.add('is-missing'));
      img.referrerPolicy = 'no-referrer';
      img.loading = img.closest('.hero') ? 'eager' : 'lazy';
      img.src = src(PHOTOS[img.dataset.photo], img.dataset.w);
    });
  }

